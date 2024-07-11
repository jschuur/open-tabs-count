import Socials from '@/components/Socials';

export default function Footer() {
  return (
    <footer className='container flex w-full max-w-5xl flex-row items-center justify-between gap-2 py-6'>
      <div className='grow text-sm text-muted-foreground'>Crafted by Joost Schuur</div>
      <Socials />
    </footer>
  );
}
