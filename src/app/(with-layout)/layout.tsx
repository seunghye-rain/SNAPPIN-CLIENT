import React from 'react';
import Gnb from '@/ui/gnb/Gnb';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='relative min-h-screen w-full'>
      <div className='mb-[7.2rem] w-full'>{children}</div>
      <Gnb />
    </div>
  );
}
