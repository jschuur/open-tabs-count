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
  if (
    process.env.SST_STAGE !== 'production' ||
    process.env.NEXT_PUBLIC_SST_STAGE !== 'production' ||
    boolean(process.env.NEXT_PUBLIC_DEBUG)
  )
    console.log(...args);
}
