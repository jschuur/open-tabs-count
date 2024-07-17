'use client';

import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import TabCountChart from '@/components/TabCountChart';
import TabCountWeekDayChart from '@/components/TabCountWeekDayChart';

import useTabCountData from '@/hooks/useTabCountData';

import { TabCountRecentDataInterval, TabCountWeekDayDataInterval } from '@/lib/tinybird';

type Props = {
  initialChartData: TabCountRecentDataInterval[];
  initialChartDataByWeekDay: TabCountWeekDayDataInterval[];
  initialLastFetchTime: number;
  userEmail: string;
};
export default function HomePage({
  initialChartData,
  initialChartDataByWeekDay,
  initialLastFetchTime,
  userEmail,
}: Props) {
  const { chartData, chartDataByWeekDay } = useTabCountData({
    initialChartData,
    initialChartDataByWeekDay,
    initialLastFetchTime,
    userEmail,
  });

  return (
    <div className='flex flex-col gap-4 py-8 mx-2 xs:mx-6'>
      <Header />
      <div className='flex flex-col lg:flex-row gap-4'>
        <div className='flex flex-col gap-4 lg:flex-1'>
          <TabCountChart title='Recent Tab Counts' chartData={chartData} />
          <TabCountWeekDayChart title='By Week Day' chartData={chartDataByWeekDay} />
        </div>
        <Sidebar chartData={chartData} className='lg:w-[250px]' />
      </div>
    </div>
  );
}
