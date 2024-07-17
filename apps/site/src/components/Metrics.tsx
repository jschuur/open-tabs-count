'use client';

import { mean } from 'lodash';
import pluralize from 'pluralize';

import { TabCountRecentDataInterval } from '@/lib/tinybird';
import { cn, shortEnglishHumanizer } from '@/lib/utils';

type MetricProps = {
  metric: string | number;
  title: string;
  footer?: string;
  className?: string;
};
function Metric({ metric, title, footer, className }: MetricProps) {
  return (
    <div className={cn('flex flex-col', className)}>
      <div className='text-sm md:text-base font-bold'>{title}</div>
      <div className='text-base xs:text-lg md:text-xl font-light'>{metric}</div>
      <div className='text-muted-foreground text-xs whitespace-nowrap'>{footer}</div>
    </div>
  );
}

type Props = {
  chartData: TabCountRecentDataInterval[];
  className?: string;
};
export default function Metrics({ chartData, className }: Props) {
  const currentTabs = chartData[chartData.length - 1];
  const averageCount = Math.round(mean(chartData.map((data) => data.averageCount)));
  const minTabs = Math.min(...chartData.map((data) => data.averageCount));
  const maxTabs = Math.max(...chartData.map((data) => data.averageCount));

  return (
    <div
      className={cn(
        'flex flex-wrap lg:flex-nowrap flex-row lg:flex-col gap-4 justify-around lg:justify-normal',
        className
      )}
    >
      <Metric
        metric={pluralize('tab', currentTabs.averageCount, true)}
        title='Currently'
        footer={
          shortEnglishHumanizer(new Date().getTime() - currentTabs.intervalStart, {
            units: ['d', 'h', 'm'],
            conjunction: ' and ',
            round: true,
            largest: 2,
          }) + ' ago'
        }
      />
      <Metric metric={pluralize('tab', averageCount, true)} title='Average' footer='last 7 days' />
      <Metric
        metric={`${minTabs} - ${maxTabs} ${pluralize('tab', maxTabs, false)}`}
        title='Range'
      />
    </div>
  );
}
