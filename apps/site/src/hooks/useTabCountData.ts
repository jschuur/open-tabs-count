'use client';

import { useEffect, useState } from 'react';

import { getRecentTabCounts, getWeekDayTabCounts } from '@/lib/tinybird';
import { debug } from '@/lib/utils';

import { TabCountRecentDataInterval, TabCountWeekDayDataInterval } from '@/lib/tinybird';

type Props = {
  initialChartData: TabCountRecentDataInterval[];
  initialChartDataByWeekDay: TabCountWeekDayDataInterval[];
  initialLastFetchTime: number;
  userEmail: string;
};
export default function useTabCountData({
  initialChartData,
  initialChartDataByWeekDay,
  initialLastFetchTime,
  userEmail,
}: Props) {
  const [chartData, setChartData] = useState(initialChartData);
  const [chartDataByWeekDay, setChartDataByWeekDay] = useState(initialChartDataByWeekDay);

  useEffect(() => {
    const currentTime = new Date().getTime();

    if (
      currentTime - initialLastFetchTime >
      parseInt(process.env.NEXT_PUBLIC_DATA_STALE_TIME!, 10) * 1000
    ) {
      debug('Revalidating stale tab count data');

      getRecentTabCounts(userEmail)
        .then((newChartData) => setChartData(newChartData))
        .catch((error) => console.error('Failed to fetch updated recentTabCounts data:', error));

      getWeekDayTabCounts(userEmail)
        .then((newChartData) => setChartDataByWeekDay(newChartData))
        .catch((error) => console.error('Failed to fetch updated weekDayTabCounts data:', error));
    }
  }, [initialLastFetchTime, userEmail]);

  return { chartData, chartDataByWeekDay };
}
