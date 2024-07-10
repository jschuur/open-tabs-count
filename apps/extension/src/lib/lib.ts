import pluralize from 'pluralize';
import { v4 as uuidv4 } from 'uuid';

import { addTabCount } from '@/lib/tinybird';
import { debug } from '@/lib/utils';

import { UpdateTrigger } from '@/types';

const CRON_INTERVAL_MINUTES = 60;

function getProfileUserInfo(): Promise<chrome.identity.UserInfo> {
  return new Promise((resolve) => {
    chrome.identity.getProfileUserInfo((userInfo) => {
      resolve(userInfo);
    });
  });
}

function getBadgeColor(count: number): string {
  if (count < 10) return '#4CAF50'; // Green
  if (count < 20) return '#FFEB3B'; // Yellow
  if (count < 50) return '#FF9800'; // Orange
  return '#F44336'; // Red
}

export function getOpenWindows() {
  return chrome.windows.getAll({ populate: false });
}

export function getOpenTabs() {
  return chrome.tabs.query({});
}

export async function updateTabCount(trigger: UpdateTrigger) {
  try {
    const tabs = await getOpenTabs();
    const windows = await getOpenWindows();
    const tabCount = tabs.length;
    const windowCount = windows.length;
    const userInfo = await getProfileUserInfo();

    const results = await chrome.storage.local.get(['instanceId']);
    const instanceId: string = results.instanceId || 'unknown';

    const data = {
      count: tabCount,
      userId: userInfo.id,
      userEmail: userInfo.email,
      trigger,
      instanceId,
    };
    const res = await addTabCount(data);

    chrome.action.setBadgeText({ text: tabCount.toString() });
    chrome.action.setBadgeTextColor({ color: '#fff' });
    chrome.action.setBadgeBackgroundColor({ color: getBadgeColor(tabCount) });
    chrome.action.setTitle({
      title: `You have ${pluralize('tab', tabCount, true)} tabs open in ${pluralize(
        'window',
        windowCount,
        true
      )}`,
    });

    debug('Tab count sent to Tinybird', { data, res });
  } catch (err) {
    console.error('Error updating tab count', err);
  }
}

export function addEventListeners() {
  chrome.alarms.create('countTabs', { periodInMinutes: CRON_INTERVAL_MINUTES });

  chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.get(['instanceId'], (result) => {
      if (!result.instanceId) {
        const instanceId = uuidv4();

        chrome.storage.local.set({ instanceId }, () => {
          debug('Instance ID is set to ' + instanceId);
        });
      } else {
        debug('Existing Instance ID: ' + result.instanceId);
      }
    });
  });

  chrome.runtime.onStartup.addListener(() => {
    debug('Open Tabs Count Extension started');
  });

  chrome.alarms.onAlarm.addListener(async (alarm) => {
    if (alarm.name === 'countTabs') await updateTabCount('cron');
  });

  chrome.tabs.onCreated.addListener(async (tab: chrome.tabs.Tab) => {
    debug(`New tab created with id ${tab.id}`);

    await updateTabCount('tabCreated');
  });

  chrome.tabs.onRemoved.addListener(
    async (tabId: number, removeInfo: chrome.tabs.TabRemoveInfo) => {
      debug(`Tab with id ${tabId} was closed`, { removeInfo });

      await updateTabCount('tabRemoved');
    }
  );

  debug('Event listeners added');
}
