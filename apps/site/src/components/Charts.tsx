'use client';

import About from '@/components/About';
import Metrics from '@/components/Metrics';
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
export default function Charts({
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
    <div className='flex flex-col gap-4 mx-2 xs:mx-6 lg:mx-16 mt-6 w-full'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
        <About className='w-full' />
        <Metrics chartData={chartData} className='w-full' />
        <TabCountChart title='Recent Tab Counts' chartData={chartData} className='w-full' />
        <TabCountWeekDayChart
          title='By Week Day'
          chartData={chartDataByWeekDay}
          className='w-full'
        />
      </div>
    </div>
  );
}
