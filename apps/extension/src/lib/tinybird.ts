import { Tinybird } from '@chronark/zod-bird';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';

import { env } from '@/env';
import { updateTriggers } from '@/types';

const tb = new Tinybird({
  token: env.TINYBIRD_TOKEN,
  baseUrl: env.TINYBIRD_BASE_URL,
});

export const addTabCount = tb.buildIngestEndpoint({
  datasource: 'tabcount',
  event: z.object({
    id: z.string().default(() => uuidv4()),
    timestamp: z.date().default(() => new Date()),
    instanceId: z.string(),
    userId: z.string(),
    userEmail: z.string(),
    count: z.number().int(),
    trigger: z.enum(updateTriggers),
  }),
});
