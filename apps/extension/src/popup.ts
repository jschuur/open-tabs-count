import { getOpenTabs, getOpenWindows } from '@/lib/lib';

(async () => {
  const openWindows = await getOpenWindows();
  const openTabs = await getOpenTabs();

  const el = document.getElementById('openTabs');

  if (el) el.textContent = `${openTabs.length} / ${openWindows.length}`;
})();
