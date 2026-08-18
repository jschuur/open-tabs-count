import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  shared: {
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    TINYBIRD_TOKEN: z.string().min(1),
    TINYBIRD_BASE_URL: z.string().url().default('https://api.tinybird.co'),
    SITE_URL: z.string().url().optional(),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    TINYBIRD_TOKEN: process.env.TINYBIRD_TOKEN,
    TINYBIRD_BASE_URL: process.env.TINYBIRD_BASE_URL,
    SITE_URL: process.env.SITE_URL,
  },
  emptyStringAsUndefined: true,
});
