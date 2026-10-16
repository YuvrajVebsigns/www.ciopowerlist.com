const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || 'https://api.core-mediagroup.com').replace(
  /\/+$/,
  '',
);

function normalizeImageUrl(value: string): string {
  const raw = value.trim();

  if (/^(https?:\/\/|data:image\/|blob:)/i.test(raw)) {
    return raw;
  }

  if (raw.startsWith('//')) {
    return `https:${raw}`;
  }

  if (raw.startsWith('/assets/')) {
    return raw;
  }

  if (raw.startsWith('/')) {
    return `${API_BASE_URL}${raw}`;
  }

  return `${API_BASE_URL}/${raw.replace(/^\.?\//, '')}`;
}

export function resolveBlogImageUrl(value: unknown, fallback: string): string {
  if (typeof value === 'string') {
    return value.trim() ? normalizeImageUrl(value) : fallback;
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      const imageUrl = resolveBlogImageUrl(item, '');
      if (imageUrl) return imageUrl;
    }
    return fallback;
  }

  if (typeof value !== 'object' || value === null) {
    return fallback;
  }

  const image = value as Record<string, unknown>;
  const directKeys = [
    'url',
    'src',
    'imageUrl',
    'imageURL',
    'fileUrl',
    'secure_url',
    'location',
    'path',
    'original',
    'large',
    'medium',
    'small',
    'thumbnail',
  ];

  for (const key of directKeys) {
    const candidate = image[key];
    if (typeof candidate === 'string' && candidate.trim()) {
      return normalizeImageUrl(candidate);
    }
  }

  const variants = image.urlVariants;
  if (typeof variants === 'object' && variants !== null) {
    for (const key of ['large', 'medium', 'small', 'thumbnail', 'original', 'url']) {
      const candidate = (variants as Record<string, unknown>)[key];
      if (typeof candidate === 'string' && candidate.trim()) {
        return normalizeImageUrl(candidate);
      }
    }
  }

  for (const key of ['data', 'attributes', 'media', 'image', 'file']) {
    const nested = image[key];
    if (nested !== value && nested !== undefined && nested !== null) {
      const imageUrl = resolveBlogImageUrl(nested, '');
      if (imageUrl) return imageUrl;
    }
  }

  return fallback;
}
