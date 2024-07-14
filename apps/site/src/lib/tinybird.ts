'use server';

import { Tinybird } from '@chronark/zod-bird';
import { z } from 'zod';

import { debug } from '@/lib/utils';

const tb = new Tinybird({
  token: process.env.TINYBIRD_TOKEN_DASHBOARD!,
  baseUrl: process.env.TINYBIRD_BASE_URL ?? 'https://api.tinybird.co',
});

const dateSchema = z.preprocess((arg) => {
  if (typeof arg == 'string' || arg instanceof Date) return new Date(arg).getTime();
  return arg;
}, z.number());

const tabCountRecentDataInterval = z.object({
  intervalStart: dateSchema,
  averageCount: z.number(),
});

const tabCountDailyDataInterval = z.object({
  intervalStart: dateSchema,
  averageCount: z.number(),
  minCount: z.number(),
  maxCount: z.number(),
});

export const getRecentTabCountsFromApi = tb.buildPipe({
  pipe: 'api_avg_tabcount_recent',
  parameters: z.object({
    userEmail: z.string().optional(),
  }),
  data: tabCountRecentDataInterval,
});

export const getDailyTabCountsFromApi = tb.buildPipe({
  pipe: 'api_avg_tabcount_daily',
  parameters: z.object({
    userEmail: z.string().optional(),
  }),
  data: tabCountDailyDataInterval,
});

export async function getRecentTabCounts(userEmail: string) {
  debug('called getRecentTabCounts');

  const { data } = await getRecentTabCountsFromApi({ userEmail });

  return data;
}

export async function getDailyTabCounts(userEmail: string) {
  debug('called getDailyTabCounts');

  const { data } = await getDailyTabCountsFromApi({ userEmail });

  return data;
}

export type TabCountRecentDataInterval = z.infer<typeof tabCountRecentDataInterval>;
export type TabCountDailyDataInterval = z.infer<typeof tabCountDailyDataInterval>;

const tabCountWeekDayDataInterval = z.object({
  weekday: z.number().min(1).max(7),
  averageCount: z.number(),
  minCount: z.number(),
  maxCount: z.number(),
});

const getWeekDayTabCountsFromApi = tb.buildPipe({
  pipe: 'api_avg_tabcount_byweekday',
  parameters: z.object({
    userEmail: z.string().optional(),
  }),
  data: tabCountWeekDayDataInterval,
});
export async function getWeekDayTabCounts(userEmail: string) {
  debug('called getWeekDayTabCounts');

  const { data } = await getWeekDayTabCountsFromApi({ userEmail });

  return data;
}

export type TabCountWeekDayDataInterval = z.infer<typeof tabCountWeekDayDataInterval>;
