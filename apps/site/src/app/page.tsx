import TabCountChart from '@/components/TabCountChart';

import { getTabCounts } from '@/lib/tinybird';

export default async function Home() {
  const { data: chartData } = await getTabCounts({ userEmail: 'jschuur@jschuur.com' });

  return (
    <main className='flex h-full items-center justify-center'>
      <TabCountChart chartData={chartData} />
    </main>
  );
}
