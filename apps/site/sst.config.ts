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
    const tinybirdTokenDashboard = new sst.Secret('TinybirdTokenDashboard');
    const tinybirdBaseUrl = new sst.Secret('TinybirdBaseUrl');
    const dataStaleTime = new sst.Secret('DataStaleTime', '900');
    const debugOutput = new sst.Secret('DebugOutput', 'false');

    const config: sst.aws.NextjsArgs = {
      link: [tinybirdTokenDashboard, tinybirdBaseUrl, dataStaleTime, debugOutput],
      environment: {
        SST_STAGE: $app.stage,
        NEXT_PUBLIC_SST_STAGE: $app.stage,
        TINYBIRD_TOKEN_DASHBOARD: tinybirdTokenDashboard.value,
        TINYBIRD_BASE_URL: tinybirdBaseUrl.value,
        NEXT_PUBLIC_DATA_STALE_TIME: dataStaleTime.value,
        NEXT_PUBLIC_DEBUG: debugOutput.value,
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
