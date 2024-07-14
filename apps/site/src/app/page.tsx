import Charts from '@/components/Charts';

import { getRecentTabCounts, getWeekDayTabCounts } from '@/lib/tinybird';

export const revalidate = parseInt(process.env.NEXT_PUBLIC_DATA_STALE_TIME!);

export default async function Home() {
  const userEmail = 'jschuur@jschuur.com';
  const initialChartData = await getRecentTabCounts(userEmail);
  const initialChartDataByWeekDay = await getWeekDayTabCounts(userEmail);
  const initialLastFetchTime = Date.now();

  return (
    <main className='flex h-full items-center justify-center'>
      <Charts
        initialChartData={initialChartData}
        initialChartDataByWeekDay={initialChartDataByWeekDay}
        initialLastFetchTime={initialLastFetchTime}
        userEmail={userEmail}
      />
    </main>
  );
}
