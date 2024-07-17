'use client';

import { Label, Pie, PieChart } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartData = [
  { browser: 'personal', visitors: 275, fill: 'var(--color-chrome)' },
  { browser: 'work', visitors: 200, fill: 'var(--color-safari)' },
];
const chartConfig = {
  accounts: {
    label: 'Visitors',
  },
  chrome: {
    label: 'Personal',
    color: 'hsl(var(--chart-1))',
  },
  safari: {
    label: 'Work',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

type Props = {
  className?: string;
};
export default function AccountRatio({ className }: Props) {
  // const totalVisitors = useMemo(() => {
  //   return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  // }, []);

  return (
    <div className={className}>
      <div className='text-sm text-center lg:text-start md:text-base font-bold'>Account Ratio</div>
      <ChartContainer config={chartConfig} className='mx-auto aspect-square max-w-[250px]'>
        <PieChart>
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Pie
            data={chartData}
            dataKey='visitors'
            nameKey='browser'
            innerRadius={60}
            strokeWidth={5}
          >
            <Label
              content={({ viewBox }) => {
                if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor='middle'
                      dominantBaseline='middle'
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className='fill-foreground text-3xl font-bold'
                      >
                        78%
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className='fill-muted-foreground'
                      >
                        Personal
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>
    </div>
  );
}
