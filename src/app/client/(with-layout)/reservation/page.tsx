'use client';

import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import { HeaderNavigation, ReservationContent } from './components';

const SCROLL_DIRECTION_THRESHOLD_PX = 8;

export default function Page() {
  const searchParams = useSearchParams();
  const [isHeaderVisible, setIsHeaderVisible] = useState<boolean>(true);
  const previousScrollTopRef = useRef<number>(0);
  const isHeaderVisibleRef = useRef<boolean>(true);
  const hasDevelopmentEnvironment = process.env.NODE_ENV === 'development';
  const hasRealAuthPreview = searchParams.get('authPreview') === 'real';
  const isLoggedInOverride =
    hasDevelopmentEnvironment && !hasRealAuthPreview ? true : undefined;

  useEffect(() => {
    isHeaderVisibleRef.current = isHeaderVisible;
  }, [isHeaderVisible]);

  useEffect(() => {
    const appScrollElement = document.getElementById('app-scroll');
    if (!appScrollElement) {
      return;
    }

    previousScrollTopRef.current = appScrollElement.scrollTop;

    const handleScroll = () => {
      const currentScrollTop = appScrollElement.scrollTop;
      const previousScrollTop = previousScrollTopRef.current;
      const delta = currentScrollTop - previousScrollTop;

      const hasScrolledDown = delta > SCROLL_DIRECTION_THRESHOLD_PX;
      const hasScrolledUp = delta < -SCROLL_DIRECTION_THRESHOLD_PX;
      const nextIsHeaderVisible =
        currentScrollTop <= 0
          ? true
          : hasScrolledDown
            ? false
            : hasScrolledUp
              ? true
              : isHeaderVisibleRef.current;

      previousScrollTopRef.current = currentScrollTop;

      nextIsHeaderVisible !== isHeaderVisibleRef.current
        ? setIsHeaderVisible(nextIsHeaderVisible)
        : null;
    };

    requestAnimationFrame(handleScroll);
    appScrollElement.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      appScrollElement.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='bg-black-3 flex min-h-full flex-col'>
      <HeaderNavigation isVisible={isHeaderVisible} />
      <ReservationContent isHeaderVisible={isHeaderVisible} isLoggedInOverride={isLoggedInOverride} />
    </div>
  );
}
