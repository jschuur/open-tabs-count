'use client';

import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

import { cn } from '@/lib/utils';

import { TabCountRecentDataInterval } from '@/lib/tinybird';

const chartConfig = {
  averageCount: {
    label: 'Average open tabs',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

type Props = {
  chartData: TabCountRecentDataInterval[];
  className?: string;
  title?: string;
};
export default function TabCountChart({ chartData, className, title }: Props) {
  return (
    <Card className={cn(className)}>
      <CardHeader>
        {title && (
          <CardTitle className='leading-8 font-semibold text-xl md:text-2xl text-balance'>
            {title}
          </CardTitle>
        )}
      </CardHeader>
      <CardContent>
        <ChartContainer className='' config={chartConfig}>
          <AreaChart accessibilityLayer data={chartData}>
            <ChartLegend verticalAlign='bottom' align='right' content={<ChartLegendContent />} />

            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='intervalStart'
              tickMargin={8}
              scale={'time'}
              tickFormatter={(value) => new Date(value).toLocaleTimeString()}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator='line'
                  className='w-[180px]'
                  nameKey='averageCount'
                  labelFormatter={(label, payload) => {
                    return new Date(payload[0].payload.intervalStart).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true,
                    });
                  }}
                />
              }
            />
            <Area
              dataKey='averageCount'
              animationDuration={300}
              type='linear'
              fill='var(--color-averageCount)'
              fillOpacity={0.4}
              stroke='var(--color-averageCount)'
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
