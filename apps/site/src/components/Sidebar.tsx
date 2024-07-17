import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// import AccountRatio from '@/components/AccountRatio';
import Metrics from '@/components/Metrics';
import Socials from '@/components/Socials';

import { cn } from '@/lib/utils';

import { TabCountRecentDataInterval } from '@/lib/tinybird';

type Props = {
  chartData: TabCountRecentDataInterval[];
  className?: string;
};
export default function Sidebar({ className, chartData }: Props) {
  return (
    <Card className={cn('flex flex-col', className)}>
      <CardHeader>
        <CardTitle className='leading-8 font-semibold text-xl md:text-2xl text-balance'>
          Metrics
        </CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col gap-4 h-full'>
        <Metrics chartData={chartData} className='grow pb-4' />
        {/* <AccountRatio className='grow' /> */}
        <Socials />
      </CardContent>
    </Card>
  );
}
