'use client';

import { useEffect, useRef, useState } from 'react';

export default function useNavigationVisibility() {
  const [isVisible, setIsVisible] = useState(true);
  const previousScrollTopRef = useRef(0);

  useEffect(() => {
    const el = document.getElementById('app-scroll');
    if (!el) {
      return;
    }

    previousScrollTopRef.current = el.scrollTop;

    const handleScroll = () => {
      const scrollTop = el.scrollTop;
      const previousScrollTop = previousScrollTopRef.current;
      const shouldShowAtTop = scrollTop <= 8;

      setIsVisible(shouldShowAtTop ? true : scrollTop > previousScrollTop ? false : true);
      previousScrollTopRef.current = scrollTop;
    };

    handleScroll();
    el.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      el.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return { isVisible };
}
