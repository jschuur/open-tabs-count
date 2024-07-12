/// <reference path="./.sst/platform/config.d.ts" />

import pc from 'picocolors';

export default $config({
  app(input) {
    return {
      name: 'open-tabs-count',
      removal: input?.stage === 'production' ? 'retain' : 'remove',
      home: 'aws',
    };
  },
  async run() {
    const config: sst.aws.NextjsArgs = {
      environment: {
        SST_STAGE: $app.stage,
        NEXT_PUBLIC_SST_STAGE: $app.stage,
        TINYBIRD_TOKEN_DASHBOARD: process.env.TINYBIRD_TOKEN_DASHBOARD ?? '',
        TINYBIRD_BASE_URL: process.env.TINYBIRD_BASE_URL ?? '',
        NEXT_PUBLIC_NODE_ENV: process.env.NODE_ENV ?? 'production',
        NEXT_PUBLIC_DATA_STALE_TIME: process.env.NEXT_PUBLIC_DATA_STALE_TIME || '900',
        NEXT_PUBLIC_DEBUG: process.env.NEXT_PUBLIC_DEBUG || 'false',
      },
    };

    if (!$dev) {
      if (process.env.SITE_HOSTNAME) {
        console.log(`Deploying as ${pc.green(process.env.SITE_HOSTNAME)}`);

        config.domain = process.env.SITE_HOSTNAME;
      } else console.warn(pc.yellow('SITE_HOSTNAME not set for non-dev build'));
    }

    new sst.aws.Nextjs('Site', config);
  },
});
