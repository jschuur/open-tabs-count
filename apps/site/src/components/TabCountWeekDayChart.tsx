'use client';

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

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

import { TabCountWeekDayDataInterval } from '@/lib/tinybird';

const chartConfig = {
  minCount: {
    label: 'Min open tabs',
    color: 'hsl(var(--chart-4))',
  },
  averageCount: {
    label: 'Average open tabs',
    color: 'hsl(var(--chart-2))',
  },
  maxCount: {
    label: 'Max open tabs',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

type Props = {
  chartData: TabCountWeekDayDataInterval[];
  className?: string;
  title?: string;
};
export default function TabCountWeekDayChart({ chartData, className, title }: Props) {
  return (
    <Card className={cn('', className)}>
      <CardHeader>
        {title && (
          <CardTitle className='leading-8 font-semibold text-xl md:text-2xl text-balance'>
            {title}
          </CardTitle>
        )}
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className='h-72 aspect-auto'>
          <BarChart accessibilityLayer data={chartData} className=''>
            <ChartLegend verticalAlign='bottom' content={<ChartLegendContent />} />
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='weekday'
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value: number) => weekDays[value - 1]}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(label, payload) => weekDays[payload[0].payload.weekday - 1]}
                  className='w-[180px]'
                  indicator='line'
                />
              }
            />

            <Bar dataKey='minCount' fill='var(--color-minCount)' radius={4} />
            <Bar dataKey='averageCount' fill='var(--color-averageCount)' radius={4} />
            <Bar dataKey='maxCount' fill='var(--color-maxCount)' radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
