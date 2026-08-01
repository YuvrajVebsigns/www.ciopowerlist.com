'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowUpLeft, ArrowUpRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import useScrollAnimation from '../../../hooks/useScrollAnimation';
import BlogCommentsPanel from '@/components/BlogCommentsPanel';
import {
  fetchWebsiteBlogBySlug,
  type WebsiteBlogContentBlock,
  type WebsiteBlogDetailItem,
} from '@/services/blogs.service';

function AnimatedBlock({
  children,
  className = '',
  animationClass = 'animate-fade-in',
  initialTransform = 'translateY(24px)',
}: {
  children: React.ReactNode;
  className?: string;
  animationClass?: string;
  initialTransform?: string;
}) {
  const ref = useScrollAnimation<HTMLDivElement>({ animationClass, initialTransform });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

function formatPublishedDate(value?: string) {
  if (!value) return '';

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return '';

  return parsed.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function getBlogImage(blog?: WebsiteBlogDetailItem | null) {
  return blog?.featureImage || blog?.seo?.ogImage || '/assets/blogs/blog-1.webp';
}

function getBlogCategory(blog?: WebsiteBlogDetailItem | null) {
  return blog?.websites?.[0]?.name || blog?.tags?.[0] || 'Blog';
}

function getBlogContentBlocks(blog?: WebsiteBlogDetailItem | null) {
  return Array.isArray(blog?.content?.blocks) ? blog.content.blocks : [];
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function renderBlock(block: WebsiteBlogContentBlock | null | undefined, index: number) {
  if (!isObject(block)) return null;

  const key = typeof block.id === 'string' ? block.id : `${String(block.type ?? 'block')}-${index}`;
  const type = typeof block.type === 'string' ? block.type.toLowerCase() : '';
  const data = isObject(block.data) ? block.data : undefined;

  if (type === 'header') {
    const level = typeof data?.level === 'number' ? data.level : 2;
    const text = typeof data?.text === 'string' ? data.text.trim() : '';
    if (!text) return null;

    if (level <= 2) {
      return (
        <h2 key={key} className="blog-content-heading">
          {text}
        </h2>
      );
    }

    return (
      <h3 key={key} className="blog-content-subheading">
        {text}
      </h3>
    );
  }

  if (type === 'paragraph') {
    const text = typeof data?.text === 'string' ? data.text.trim() : '';
    if (!text) return null;

    return (
      <p key={key} className="blog-content-paragraph" dangerouslySetInnerHTML={{ __html: text }} />
    );
  }

  if (type === 'list') {
    const items = Array.isArray(data?.items)
      ? data.items.filter((item): item is string => typeof item === 'string')
      : [];

    if (!items.length) return null;

    return (
      <ul key={key} className="overview-list">
        {items.map((item) => (
          <li key={item}>
            <strong>{item}</strong>
          </li>
        ))}
      </ul>
    );
  }

  if (type === 'image') {
    const file = isObject(data?.file) ? data.file : undefined;
    const url = typeof file?.url === 'string' ? file.url : '';
    if (!url) return null;

    return (
      <div key={key} className="blog-content-image-wrap">
        <Image
          src={url}
          alt={typeof data?.caption === 'string' ? data.caption : 'Blog image'}
          width={1200}
          height={675}
          className="blog-content-image"
          unoptimized
        />
      </div>
    );
  }

  if (type === 'quote') {
    const text = typeof data?.text === 'string' ? data.text.trim() : '';
    if (!text) return null;

    return (
      <blockquote key={key} className="blog-content-quote">
        {text}
      </blockquote>
    );
  }

  if (type === 'delimiter') {
    return <hr key={key} style={{ margin: '24px 0' }} />;
  }

  return null;
}

export default function BlogDetailsPage() {
  const params = useParams<{ slug?: string | string[] }>();
  const slug = Array.isArray(params?.slug) ? params.slug[0] : (params?.slug ?? '');

  const [blog, setBlog] = useState<WebsiteBlogDetailItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showShareOptions, setShowShareOptions] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadBlog() {
      if (!slug) {
        if (isMounted) {
          setError('Blog slug is missing.');
          setIsLoading(false);
        }
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetchWebsiteBlogBySlug(slug);

        if (isMounted) {
          setBlog(response);
          setError(response ? null : 'Blog not found.');
        }
      } catch (fetchError) {
        if (isMounted) {
          setBlog(null);
          setError(fetchError instanceof Error ? fetchError.message : 'Failed to load blog');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadBlog();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (isLoading) {
    return (
      <main className="blog-detail-page">
        <p style={{ padding: '80px 20px', textAlign: 'center' }}>Loading blog...</p>
      </main>
    );
  }

  if (error || !blog) {
    return (
      <main className="not-found-page">
        <Image src="/assets/404.png" alt="Blog Not Found" width={700} height={500} />

        <h1>Blog Not Found</h1>

        <p>
          The article you&apos;re looking for may have been moved, removed, or is no longer
          available. Discover our latest blogs and stay informed with fresh insights.
        </p>

        <Link href="/blog" className="backbutton">
          <div className="backbutton-icon">
            <ArrowUpLeft size={18} />
          </div>

          <span>Back to Blog</span>
        </Link>
      </main>
    );
  }

  const displayTitle = blog.title;
  const displayCategory = getBlogCategory(blog);
  const displayDate = formatPublishedDate(blog.publishedAt);
  const displayImage = getBlogImage(blog);
  const contentBlocks = getBlogContentBlocks(blog);
  const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/blog/${slug}` : '';

  function openExternal(url: string) {
    try {
      window.open(url, '_blank', 'noopener');
    } catch (_) {
      // ignore
    }
  }
  async function handleShareWhatsApp() {
    const waUrl = `https://web.whatsapp.com/send?text=${encodeURIComponent(shareUrl)}`;
    openExternal(waUrl);
    setShowShareOptions(false);
  }

  async function handleShareFacebook() {
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    openExternal(fbUrl);
    setShowShareOptions(false);
  }

  async function handleShareTwitter() {
    const twUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(displayTitle || '')}&url=${encodeURIComponent(shareUrl)}`;
    openExternal(twUrl);
    setShowShareOptions(false);
  }

  async function handleShareInstagram() {
    const igWeb = `https://www.instagram.com/?url=${encodeURIComponent(shareUrl)}`;
    openExternal(igWeb);
    setShowShareOptions(false);
  }

  // minimal helpers kept; unused icon components removed to satisfy linter

  async function copyLinkToClipboard() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      // Small UX feedback could be added here (toast), kept minimal per request
    } catch (_) {
      // ignore
    }
  }

  return (
    <main className="blog-detail-page">
      <article className="blogpage-card blogpage-stacked">
        <AnimatedBlock
          className="blogpage-media"
          animationClass="animate-fade-in"
          initialTransform="translateY(28px)"
        >
          <Image
            src={displayImage}
            alt={displayTitle}
            fill
            priority
            className="blogpage-media-image"
            unoptimized
          />
        </AnimatedBlock>

        <div className="blogpage-body blog-detail-layout">
          <AnimatedBlock
            className="blogpage-content"
            animationClass="animate-fade-in-left"
            initialTransform="translateX(-24px)"
          >
            <div className="blogpage-meta">
              <span className="blogpage-category">{displayCategory}</span>
            </div>

            <h1 className="blogpage-title">{displayTitle}</h1>

            {displayDate ? (
              <div className="blogpage-meta" style={{ marginBottom: '18px' }}>
                Published on {displayDate}
              </div>
            ) : null}

            <div className="blog-content-blocks">
              {contentBlocks.map((block, index) => renderBlock(block, index))}
            </div>
            <br />

            <div className="blog-detail-actions">
              <AnimatedBlock
                className="blog-back-link"
                animationClass="animate-fade-in"
                initialTransform="translateY(18px)"
              >
                <Link href="/blog" className="talk-btn">
                  {/* <div className="backbutton-icon">
                    <ArrowUpLeft size={18} />
                  </div> */}

                  <span>Back to Blog</span>
                  <div className="talk-btn-icon">
                    <ArrowUpRight size={18} />
                  </div>
                </Link>
              </AnimatedBlock>
              <br />
              <AnimatedBlock
                className="blog-back-link"
                animationClass="animate-fade-in"
                initialTransform="translateY(18px)"
              >
                <div className="share-container">
                  <button
                    type="button"
                    className="talk-btn"
                    onClick={() => setShowShareOptions((s) => !s)}
                    aria-expanded={showShareOptions}
                    aria-haspopup="menu"
                    id="share-button"
                  >
                    <span>Share Blog</span>
                    <div className="talk-btn-icon">
                      <ArrowUpRight size={18} />
                    </div>
                  </button>

                  <br />

                  {showShareOptions ? (
                    <div className="share-popup" role="menu" aria-labelledby="share-button">
                      <button
                        type="button"
                        onClick={handleShareWhatsApp}
                        className="share-option whatsapp"
                      >
                        {/* <span style={{ display: 'inline-flex', marginRight: 8 }}>
                        <WhatsAppIcon />
                      </span> */}
                        <span>WhatsApp</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleShareFacebook}
                        className="share-option facebook"
                      >
                        {/* <span style={{ display: 'inline-flex', marginRight: 8 }}>
                        <FacebookIcon />
                      </span> */}
                        <span>Facebook</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleShareTwitter}
                        className="share-option twitter"
                      >
                        {/* <span style={{ display: 'inline-flex', marginRight: 8 }}>
                        <TwitterIcon />
                      </span> */}
                        <span>Twitter</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleShareInstagram}
                        className="share-option instagram"
                      >
                        {/* <span style={{ display: 'inline-flex', marginRight: 8 }}>
                        <InstagramIcon />
                      </span> */}
                        <span>Instagram</span>
                      </button>

                      <button
                        type="button"
                        onClick={copyLinkToClipboard}
                        className="share-option copy"
                      >
                        {/* <span style={{ display: 'inline-flex', marginRight: 8 }}>
                        <LinkIcon />
                      </span> */}
                        <span>Copy Link</span>
                      </button>
                    </div>
                  ) : null}
                </div>
              </AnimatedBlock>
            </div>
          </AnimatedBlock>

          <aside className="blog-comments-side-card">
            <h3 className="blog-comments-side-card-title">Comments</h3>

            {blog.id ? (
              <BlogCommentsPanel blogId={String(blog.id)} />
            ) : (
              <p>No comments available.</p>
            )}
          </aside>
        </div>
      </article>
    </main>
  );
}
