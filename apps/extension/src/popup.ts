import pluralize from 'pluralize';

import { getOpenTabs, getOpenWindows } from '@/lib/lib';

(async () => {
  const openWindows = await getOpenWindows();
  const openTabs = await getOpenTabs();

  const el = document.getElementById('counts');

  if (el)
    el.textContent = `${pluralize('tab', openTabs.length, true)}, ${pluralize(
      'window',
      openWindows.length,
      true
    )}`;

  const siteDiv = document.getElementById('site');

  if (siteDiv) {
    const anchor = siteDiv.querySelector('a');

    if (anchor && process.env.SITE_URL) anchor.href = process.env.SITE_URL;
  }
})();
