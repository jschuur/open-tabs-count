'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { cn } from '@/lib/utils';

type Props = {
  className?: string;
};
export default function About({ className }: Props) {
  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle className='text-center md:text-start leading-8 font-bold text-3xl text-balance'>
          Joost&apos;s Tab Count History
        </CardTitle>
      </CardHeader>
      <CardContent className='text-muted-foreground'>
        <p>
          An{' '}
          <a className='text-link' href='https://github.com/jschuur/open-tabs-count'>
            experiment
          </a>{' '}
          with{' '}
          <a className='text-link' href='https://tinybird.co'>
            Tinybird
          </a>{' '}
          and{' '}
          <a className='text-link' href='https://ui.shadcn.com/charts'>
            shadcn/ui charts
          </a>
          .
        </p>
      </CardContent>
    </Card>
  );
}
