/// <reference path="./.sst/platform/config.d.ts" />

import { createEnv } from '@t3-oss/env-nextjs';
import pc from 'picocolors';
import { z } from 'zod';

const env = createEnv({
  server: {
    TINYBIRD_TOKEN_DASHBOARD: z.string().min(1),
    TINYBIRD_BASE_URL: z.string().url().default('https://api.tinybird.co'),
    NEXT_PUBLIC_DATA_STALE_TIME: z.coerce.number().int().positive().default(900),
    NEXT_PUBLIC_DEBUG: z.enum(['true', 'false']).default('false'),
    CACHE_POLICY: z.string().optional(),
    SITE_HOSTNAME: z.string().optional(),
    USER_EMAIL: z.string().email().optional(),
  },
  runtimeEnv: {
    TINYBIRD_TOKEN_DASHBOARD: process.env.TINYBIRD_TOKEN_DASHBOARD,
    TINYBIRD_BASE_URL: process.env.TINYBIRD_BASE_URL,
    NEXT_PUBLIC_DATA_STALE_TIME: process.env.NEXT_PUBLIC_DATA_STALE_TIME,
    NEXT_PUBLIC_DEBUG: process.env.NEXT_PUBLIC_DEBUG,
    CACHE_POLICY: process.env.CACHE_POLICY,
    SITE_HOSTNAME: process.env.SITE_HOSTNAME,
    USER_EMAIL: process.env.USER_EMAIL,
  },
  emptyStringAsUndefined: true,
});

export default $config({
  app(input) {
    return {
      name: 'open-tabs-count',
      removal: input?.stage === 'production' ? 'retain' : 'remove',
      home: 'aws',
    };
  },
  async run() {
    const secrets = {
      tinybirdTokenDashboard: new sst.Secret(
        'TinybirdTokenDashboard',
        env.TINYBIRD_TOKEN_DASHBOARD
      ).value,
      tinybirdBaseUrl: new sst.Secret(
        'TinybirdBaseUrl',
        env.TINYBIRD_BASE_URL
      ).value,
      dataStaleTime: new sst.Secret(
        'DataStaleTime',
        String(env.NEXT_PUBLIC_DATA_STALE_TIME)
      ).value,
      debugOutput: new sst.Secret('DebugOutput', env.NEXT_PUBLIC_DEBUG).value,
      cachePolicy: new sst.Secret('CachePolicy', env.CACHE_POLICY ?? '').value,
      siteHostName: new sst.Secret('SiteHostName', env.SITE_HOSTNAME ?? '').value,
      userEmail: new sst.Secret('UserEmail', env.USER_EMAIL ?? '').value,
    };

    const appConfig = new sst.Linkable('Config', {
      properties: secrets,
    });

    const config: sst.aws.NextjsArgs = {
      link: [appConfig],
      environment: {
        SST_STAGE: $app.stage,
        NEXT_PUBLIC_SST_STAGE: $app.stage,
        NEXT_PUBLIC_DATA_STALE_TIME: secrets.dataStaleTime,
        NEXT_PUBLIC_DEBUG: secrets.debugOutput,
      },
    };

    if (!$dev) {
      if (secrets.siteHostName) {
        $resolve([secrets.siteHostName]).apply(([value]) =>
          console.log(`Deploying as ${pc.green(value)}`)
        );

        config.domain = secrets.siteHostName;
      } else console.warn(pc.yellow('Warning: Site hostname not set for non-dev build'));

      if (secrets.cachePolicy) {
        config.cachePolicy = secrets.cachePolicy;

        console.log('Using custom cache policy');
      } else
        console.warn(pc.yellow('Warning: No custom cache policy set. SST will create a new one.'));
    }

    new sst.aws.Nextjs('Site', config);
  },
});
