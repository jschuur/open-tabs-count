import { Resource } from 'sst';

import HomePage from '@/components/HomePage';

import { getRecentTabCounts, getWeekDayTabCounts } from '@/lib/tinybird';

export const revalidate = parseInt(Resource.Config.dataStaleTime);

export default async function Home() {
  const userEmail = Resource.Config.userEmail;

  if (!userEmail) return <div>User email not set</div>;

  const initialChartData = await getRecentTabCounts(userEmail);
  const initialChartDataByWeekDay = await getWeekDayTabCounts(userEmail);
  const initialLastFetchTime = Date.now();

  return (
    <main>
      <HomePage
        initialChartData={initialChartData}
        initialChartDataByWeekDay={initialChartDataByWeekDay}
        initialLastFetchTime={initialLastFetchTime}
        userEmail={userEmail}
      />
    </main>
  );
}
