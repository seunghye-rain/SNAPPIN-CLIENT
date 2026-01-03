import React from 'react';
import { Footer } from '@/ui';
import ScrollFooter from './ScrollFooter';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='relative'>
      <div className='w-full'>{children}</div>
      <ScrollFooter />
      <Footer />
    </div>
  );
}
