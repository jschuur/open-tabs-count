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
        TINYBIRD_TOKEN_DASHBOARD: process.env.TINYBIRD_TOKEN_DASHBOARD ?? '',
        TINYBIRD_BASE_URL: process.env.TINYBIRD_BASE_URL ?? '',
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
