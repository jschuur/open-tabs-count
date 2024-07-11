'use server';

import { Tinybird } from '@chronark/zod-bird';
import { z } from 'zod';

const tb = new Tinybird({
  token: process.env.TINYBIRD_TOKEN_DASHBOARD!,
  baseUrl: process.env.TINYBIRD_BASE_URL ?? 'https://api.tinybird.co',
});

const dateSchema = z.preprocess((arg) => {
  if (typeof arg == 'string' || arg instanceof Date) return new Date(arg).getTime();
  return arg;
}, z.number());

const tabCountDataInterval = z.object({
  intervalStart: dateSchema,
  averageCount: z.number(),
});

export const getTabCounts = tb.buildPipe({
  pipe: 'api_avg_tabcount',
  parameters: z.object({
    userEmail: z.string().optional(),
  }),
  data: tabCountDataInterval,
});

export type TabCountDataInterval = z.infer<typeof tabCountDataInterval>;
