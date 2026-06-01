export type WinnerEntry = {
  slug: string;
  label: string;
  route: string;
  summary: string;
};

export const winnerEntries: WinnerEntry[] = [
  {
    slug: 'winner-1',
    label: 'Winner 1',
    route: '/winners/winner-1',
    summary: 'Featured winner profile placeholder for the first winner slot.',
  },
  {
    slug: 'winner-2',
    label: 'Winner 2',
    route: '/winners/winner-2',
    summary: 'Featured winner profile placeholder for the second winner slot.',
  },
  {
    slug: 'winner-3',
    label: 'Winner 3',
    route: '/winners/winner-3',
    summary: 'Featured winner profile placeholder for the third winner slot.',
  },
  {
    slug: 'winner-4',
    label: 'Winner 4',
    route: '/winners/winner-4',
    summary: 'Featured winner profile placeholder for the fourth winner slot.',
  },
  {
    slug: 'winner-5',
    label: 'Winner 5',
    route: '/winners/winner-5',
    summary: 'Featured winner profile placeholder for the fifth winner slot.',
  },
  {
    slug: 'winner-6',
    label: 'Winner 6',
    route: '/winners/winner-6',
    summary: 'Featured winner profile placeholder for the sixth winner slot.',
  },
  {
    slug: 'winner-7',
    label: 'Winner 7',
    route: '/winners/winner-7',
    summary: 'Featured winner profile placeholder for the seventh winner slot.',
  },
  {
    slug: 'winner-8',
    label: 'Winner 8',
    route: '/winners/winner-8',
    summary: 'Featured winner profile placeholder for the eighth winner slot.',
  },
  {
    slug: 'winner-9',
    label: 'Winner 9',
    route: '/winners/winner-9',
    summary: 'Featured winner profile placeholder for the ninth winner slot.',
  },
  {
    slug: 'winner-10',
    label: 'Winner 10',
    route: '/winners/winner-10',
    summary: 'Featured winner profile placeholder for the tenth winner slot.',
  },
];

export function getWinnerBySlug(slug: string) {
  return winnerEntries.find((entry) => entry.slug === slug);
}
