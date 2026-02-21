'use client';

import { ReactNode } from 'react';

const EXPLORE_FROM_DETAIL_BACK = 'explore_from_detail_back_v1';

type ExploreDetailBackBoundaryProps = {
  children: ReactNode;
  className?: string;
};

export default function ExploreDetailBackBoundary({
  children,
  className,
}: ExploreDetailBackBoundaryProps) {
  return (
    <main
      className={className}
      onClickCapture={(e) => {
        const target = e.target as HTMLElement | null;
        const anchor = target?.closest('a[href]');
        const href = anchor?.getAttribute('href');

        if (!href) return;
        if (!href.startsWith('/portfolio/') && !href.startsWith('/product/')) return;

        sessionStorage.setItem(EXPLORE_FROM_DETAIL_BACK, '1');
      }}
    >
      {children}
    </main>
  );
}
