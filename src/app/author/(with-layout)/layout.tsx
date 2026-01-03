import React from 'react';
import { Footer } from '@/ui';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='relative h-screen'>
      <div className='mb-[7.2rem] h-full w-full'>{children}</div>
      <Footer userRole='author' />
    </div>
  );
}
