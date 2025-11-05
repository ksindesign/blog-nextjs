import SideNav from '@/app/ui/components/sidenav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='h-full bg-white'>
      <div className='hero-banner w-full h-full min-h-[30vh] overflow-hidden'></div>
      <div className='inner max-w-4xl mx-auto flex flex-col md:flex-row  md:overflow-hidden'>
        <div className='w-full flex-none md:w-64 h-full'>
          <SideNav />
        </div>
        <div className='flex-grow p-6 md:overflow-y-auto md:p-12'>
          {children}
        </div>
      </div>
    </div>
  );
}
