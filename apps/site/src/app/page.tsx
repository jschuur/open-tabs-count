import HomePage from '@/components/HomePage';

import { getRecentTabCounts, getWeekDayTabCounts } from '@/lib/tinybird';

export const revalidate = parseInt(process.env.NEXT_PUBLIC_DATA_STALE_TIME!);

export default async function Home() {
  const userEmail = 'jschuur@jschuur.com';
  const initialChartData = await getRecentTabCounts(userEmail);
  const initialChartDataByWeekDay = await getWeekDayTabCounts(userEmail);
  const initialLastFetchTime = Date.now();

  return (
    <main className=''>
      <HomePage
        initialChartData={initialChartData}
        initialChartDataByWeekDay={initialChartDataByWeekDay}
        initialLastFetchTime={initialLastFetchTime}
        userEmail={userEmail}
      />
    </main>
  );
}
