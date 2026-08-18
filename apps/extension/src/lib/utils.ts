import { env } from '@/env';

export function debug(...args: any[]) {
  if (env.NODE_ENV === 'development') console.log(...args);
}
