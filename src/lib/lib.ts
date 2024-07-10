import pluralize from 'pluralize';
import { v4 as uuidv4 } from 'uuid';

import { addTabCount } from '@/lib/tinybird';

import { UpdateTrigger } from '@/types';

const CHECK_INTERVAL_MINUTES = 60;

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

    console.log('Tab count sent to Tinybird', { data, res });
  } catch (err) {
    console.error('Error updating tab count', err);
  }
}

export function addEventListeners() {
  chrome.alarms.create('countTabs', { periodInMinutes: CHECK_INTERVAL_MINUTES });

  chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.local.get(['instanceId'], function (result) {
      if (!result.instanceId) {
        const instanceId = uuidv4();

        chrome.storage.local.set({ instanceId }, () => {
          console.log('Instance ID is set to ' + instanceId);
        });
      } else {
        console.log('Existing Instance ID: ' + result.instanceId);
      }
    });
  });

  chrome.alarms.onAlarm.addListener(async (alarm) => {
    if (alarm.name === 'countTabs') await updateTabCount('cron');
  });

  chrome.tabs.onCreated.addListener(async (tab: chrome.tabs.Tab) => {
    console.log(`New tab created with id ${tab.id}`);

    await updateTabCount('tabCreated');
  });

  chrome.tabs.onRemoved.addListener(
    async (tabId: number, removeInfo: chrome.tabs.TabRemoveInfo) => {
      console.log(`Tab with id ${tabId} was closed`, { removeInfo });

      await updateTabCount('tabRemoved');
    }
  );
}
