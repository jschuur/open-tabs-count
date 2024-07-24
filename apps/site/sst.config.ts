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
    const secrets = {
      tinybirdTokenDashboard: new sst.Secret(
        'TinybirdTokenDashboard',
        process.env.TINYBIRD_TOKEN_DASHBOARD
      ).value,
      tinybirdBaseUrl: new sst.Secret(
        'TinybirdBaseUrl',
        process.env.TINYBIRD_BASE_URL || 'https://api.tinybird.co'
      ).value,
      dataStaleTime: new sst.Secret(
        'DataStaleTime',
        process.env.NEXT_PUBLIC_DATA_STALE_TIME || '900'
      ).value,
      debugOutput: new sst.Secret('DebugOutput', process.env.NEXT_PUBLIC_DEBUG || 'false').value,
      cachePolicy: new sst.Secret('CachePolicy', process.env.CACHE_POLICY || '').value,
      siteHostName: new sst.Secret('SiteHostName', process.env.SITE_HOSTNAME || '').value,
      userEmail: new sst.Secret('UserEmail', process.env.USER_EMAIL || '').value,
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
