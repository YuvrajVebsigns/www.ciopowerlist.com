export type SpeakerEntry = {
  slug: string;
  label: string;
  route: string;
  summary: string;
};

export const speakerEntries: SpeakerEntry[] = [
  {
    slug: 'speaker-2016',
    label: 'Speaker 2016',
    route: '/speakers/speaker-2016',
    summary: 'Featured speaker profile placeholder for the 2016 edition.',
  },
  {
    slug: 'speaker-2017',
    label: 'Speaker 2017',
    route: '/speakers/speaker-2017',
    summary: 'Featured speaker profile placeholder for the 2017 edition.',
  },
  {
    slug: 'speaker-2018',
    label: 'Speaker 2018',
    route: '/speakers/speaker-2018',
    summary: 'Featured speaker profile placeholder for the 2018 edition.',
  },
  {
    slug: 'speaker-2019',
    label: 'Speaker 2019',
    route: '/speakers/speaker-2019',
    summary: 'Featured speaker profile placeholder for the 2019 edition.',
  },
  {
    slug: 'speaker-2020',
    label: 'Speaker 2020',
    route: '/speakers/speaker-2020',
    summary: 'Featured speaker profile placeholder for the 2020 edition.',
  },
  {
    slug: 'speaker-2021',
    label: 'Speaker 2021',
    route: '/speakers/speaker-2021',
    summary: 'Featured speaker profile placeholder for the 2021 edition.',
  },
  {
    slug: 'speaker-2022',
    label: 'Speaker 2022',
    route: '/speakers/speaker-2022',
    summary: 'Featured speaker profile placeholder for the 2022 edition.',
  },
  {
    slug: 'speaker-2023',
    label: 'Speaker 2023',
    route: '/speakers/speaker-2023',
    summary: 'Featured speaker profile placeholder for the 2023 edition.',
  },
  {
    slug: 'speaker-2024',
    label: 'Speaker 2024',
    route: '/speakers/speaker-2024',
    summary: 'Featured speaker profile placeholder for the 2024 edition.',
  },
  {
    slug: 'speaker-2025',
    label: 'Speaker 2025',
    route: '/speakers/speaker-2025',
    summary: 'Featured speaker profile placeholder for the 2025 edition.',
  },
];

export function getSpeakerBySlug(slug: string) {
  return speakerEntries.find((entry) => entry.slug === slug);
}
