import { useEffect, useState } from 'react';

import { getTabCounts } from '@/lib/tinybird';
import { debug } from '@/lib/utils';

import { TabCountDataInterval } from '@/lib/tinybird';

function transformChartData(data: TabCountDataInterval[]) {
  data.forEach((interval) => {
    interval.averageCount = Math.round(interval.averageCount);
  });

  return data;
}

type Props = {
  initialChartData: TabCountDataInterval[];
  initialLastFetchTime: number;
  userEmail: string;
};
export default function useTabCountData({
  initialChartData,
  initialLastFetchTime,
  userEmail,
}: Props) {
  const [chartData, setChartData] = useState(transformChartData(initialChartData));

  useEffect(() => {
    const currentTime = new Date().getTime();

    if (
      currentTime - initialLastFetchTime >
      parseInt(process.env.NEXT_PUBLIC_DATA_STALE_TIME!, 10) * 1000
    ) {
      debug('Revalidating stale tab count data');

      getTabCounts(userEmail)
        .then(({ chartData: newChartData }) => setChartData(transformChartData(newChartData)))
        .catch((error) => console.error('Failed to fetch updated data:', error));
    }
  }, [initialLastFetchTime, userEmail]);

  return { chartData };
}
