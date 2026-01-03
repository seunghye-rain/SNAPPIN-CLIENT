'use client';

import { useEffect, useState } from 'react';
import { Logo } from '@/assets';

export default function ScrollFooter() {
  const [hasScroll, setHasScroll] = useState(false);

  useEffect(() => {
    const el = document.getElementById('app-scroll');
    if (!el) return;

    const check = () => {
      setHasScroll(el.scrollHeight > el.clientHeight);
    };

    check();
    requestAnimationFrame(check);

    const ro = new ResizeObserver(check);
    ro.observe(el);

    el.addEventListener('scroll', check, { passive: true });

    return () => {
      ro.disconnect();
      el.removeEventListener('scroll', check);
    };
  }, []);

  if (!hasScroll) return <div className='h-[6.2rem]'></div>;

  return (
    <div className='bg-black-3 mb-[6.2rem] flex h-[6.7rem] items-center justify-center px-[2rem]'>
      <Logo className='text-black-5' width={100} />
    </div>
  );
}
