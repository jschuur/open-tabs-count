'use client';
import pluralize from 'pluralize';

import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

import { shortEnglishHumanizer } from '@/lib/utils';

import { TabCountDataInterval } from '@/lib/tinybird';

const chartConfig = {
  averageCount: {
    label: 'Average tabs',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

type Props = {
  chartData: any;
};
export default function TabCountChart({ chartData }: Props) {
  chartData.forEach((interval: TabCountDataInterval) => {
    interval.averageCount = Math.round(interval.averageCount);
  });
  const currentTabs = chartData[chartData.length - 1];

  return (
    <Card className='md:w-3/4 mx-4 mt-4'>
      <CardHeader>
        <div className='flex justify-between items-start gap-16'>
          <CardTitle className='leading-8 font-medium text-lg md:text-2xl text-balance'>
            How many Chrome tabs does Joost have open right now?
          </CardTitle>
          <div className='px-4 py-2 text-lg md:text-2xl font-medium whitespace-nowrap bg-green-100 rounded border border-green-200'>
            <div>{pluralize('tab', currentTabs.averageCount, true)}</div>
            <div className='text-muted-foreground text-sm whitespace-nowrap'>
              {shortEnglishHumanizer(new Date().getTime() - currentTabs.intervalStart, {
                units: ['d', 'h', 'm'],
                conjunction: ' and ',
                round: true,
                largest: 2,
              })}{' '}
              ago
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer className='max-h-80 w-full' config={chartConfig}>
          <AreaChart accessibilityLayer data={chartData}>
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
                  className='w-[160x]'
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
      <CardFooter className='text-muted-foreground'>
        <p>
          An experiment with{' '}
          <a className='text-link' href='https://tinybird.co'>
            Tinybird
          </a>{' '}
          and{' '}
          <a className='text-link' href='https://ui.shadcn.com/charts'>
            shadcn/ui charts
          </a>
          . Useful:{' '}
          <a
            className='text-link'
            href='https://chromewebstore.google.com/detail/the-marvellous-suspender/noogafoofpebimajpfpamcfhoaifemoa?hl=en'
          >
            The Marvelous Suspender
          </a>
          .
        </p>
      </CardFooter>
    </Card>
  );
}
