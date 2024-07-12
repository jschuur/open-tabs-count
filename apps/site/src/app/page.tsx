import TabCountChart from '@/components/TabCountChart';

import { getTabCounts } from '@/lib/tinybird';

export const revalidate = parseInt(process.env.NEXT_PUBLIC_DATA_STALE_TIME!);

export default async function Home() {
  const userEmail = 'jschuur@jschuur.com';
  const { chartData: initialChartData } = await getTabCounts(userEmail);
  const initialLastFetchTime = Date.now();

  return (
    <main className='flex h-full items-center justify-center'>
      <TabCountChart
        initialChartData={initialChartData}
        initialLastFetchTime={initialLastFetchTime}
        userEmail={userEmail}
      />
    </main>
  );
}
