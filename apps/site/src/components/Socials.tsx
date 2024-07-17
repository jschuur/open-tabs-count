import { IconBrandGithub, IconBrandThreads, IconBrandTwitter } from '@tabler/icons-react';

import { cn } from '@/lib/utils';

type Props = {
  className?: string;
};
export default function Socials({ className }: Props) {
  return (
    <div
      className={cn('flex flex-wrap gap-2 lg:flex-col justify-end lg:justify-normal', className)}
    >
      <a
        href='https://threads.net/@joostschuur'
        title='Threads (Joost Schuur)'
        target='_blank'
        className='group text-xs font-semibold text-black'
      >
        <IconBrandThreads className='size-5 text-black transition ease-in-out group-hover:scale-125 inline-block mr-1' />
        joostschuur
      </a>
      <a
        href='https://twitter.com/joostschuur'
        title='Twitter (Joost Schuur)'
        target='_blank'
        className='text-xs group font-semibold text-blue-400'
      >
        <IconBrandTwitter className='size-5 text-blue-400 transition ease-in-out group-hover:scale-125 inline-block mr-1' />
        joostschuur
      </a>
      <a
        href='https://github.com/jschuur/open-tabs-count'
        title='GitHub'
        target='_blank'
        className='text-xs font-semibold group text-purple-700'
      >
        <IconBrandGithub className='size-5 text-purple-700 transition ease-in-out group-hover:scale-125 inline-block mr-1' />
        jschuur/open-tabs-count
      </a>
    </div>
  );
}
