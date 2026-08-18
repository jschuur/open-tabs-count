import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  client: {
    NEXT_PUBLIC_SST_STAGE: z.string().default('development'),
    NEXT_PUBLIC_DATA_STALE_TIME: z.coerce.number().int().positive().default(900),
    NEXT_PUBLIC_DEBUG: z.enum(['true', 'false']).default('false'),
  },
  runtimeEnv: {
    NEXT_PUBLIC_SST_STAGE: process.env.NEXT_PUBLIC_SST_STAGE,
    NEXT_PUBLIC_DATA_STALE_TIME: process.env.NEXT_PUBLIC_DATA_STALE_TIME,
    NEXT_PUBLIC_DEBUG: process.env.NEXT_PUBLIC_DEBUG,
  },
  emptyStringAsUndefined: true,
});
