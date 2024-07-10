import { Tinybird } from '@chronark/zod-bird';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';

import { updateTriggers } from '@/types';

const tb = new Tinybird({
  token: process.env.TINYBIRD_TOKEN!,
  baseUrl: process.env.TINYBIRD_BASE_URL ?? 'https://api.tinybird.co',
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
