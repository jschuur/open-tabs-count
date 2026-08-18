import { boolean } from 'boolean';
import { type ClassValue, clsx } from 'clsx';
import humanizeDuration from 'humanize-duration';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const shortEnglishHumanizer = humanizeDuration.humanizer({
  language: 'shortEn',
  languages: {
    shortEn: {
      y: () => 'y',
      mo: () => 'mo',
      w: () => 'w',
      d: () => 'd',
      h: () => 'h',
      m: () => 'm',
      s: () => 's',
      ms: () => 'ms',
    },
  },
});

export function debug(...args: any[]) {
  const stage = process.env.NEXT_PUBLIC_SST_STAGE ?? process.env.SST_STAGE;

  if (
    stage !== 'production' ||
    boolean(process.env.NEXT_PUBLIC_DEBUG)
  )
    console.log(...args);
}
