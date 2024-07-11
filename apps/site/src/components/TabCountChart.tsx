'use client';

import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

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
  const countValues = chartData.map((d: TabCountDataInterval) => d.averageCount);
  const maxCount = Math.round(Math.max(...countValues));
  const minCount = Math.round(Math.min(...countValues));

  return (
    <Card className='md:w-3/4 mx-4 mt-4'>
      <CardHeader>
        <CardTitle className='leading-8'>
          How many Chrome tabs does Joost have open right now?
        </CardTitle>
        <CardDescription>
          Range: {maxCount} - {minCount}. He needs them all, they&apos;re all important!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className='max-h-80 w-full' config={chartConfig}>
          <AreaChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='intervalStart'
              // tickLine={false}
              // axisLine={false}
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
