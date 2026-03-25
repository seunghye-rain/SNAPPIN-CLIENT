'use client';

import { useEffect, useState } from 'react';

export function useExploreOptionVisibility(targetId: string) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;

    let rafId = 0;
    let prevScrollTop = el.scrollTop;

    const scheduleCompute = () => {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        rafId = 0;
        const nextScrollTop = el.scrollTop;
        const delta = nextScrollTop - prevScrollTop;

        if (nextScrollTop <= 8) {
          setIsVisible(true);
        } else if (delta > 4) {
          setIsVisible(false);
        } else if (delta < -4) {
          setIsVisible(true);
        }

        prevScrollTop = nextScrollTop;
      });
    };

    scheduleCompute();
    el.addEventListener('scroll', scheduleCompute, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      el.removeEventListener('scroll', scheduleCompute);
    };
  }, [targetId]);

  return { isVisible };
}
