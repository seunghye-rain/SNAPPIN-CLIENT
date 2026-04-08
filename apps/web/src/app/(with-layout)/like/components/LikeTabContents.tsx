import { Suspense } from 'react';
import { PortfolioFrameListSkeleton, ProductFrameListSkeleton } from '@/ui';
import PortfolioListSection from '../_section/PortfolioListSection';
import ProductListSection from '../_section/ProductListSection';
import { LIKE_TAB, type LikeTab } from '../constants/tab';

type LikeTabContentsProps = {
  currentTab: LikeTab;
};

export default function LikeTabContents({ currentTab }: LikeTabContentsProps) {
  return (
    <div className='scrollbar-hide bg-black-1 min-h-0 overflow-y-hidden'>
      {currentTab === LIKE_TAB.PORTFOLIO && (
        <section className='min-h-full'>
          <Suspense fallback={<PortfolioFrameListSkeleton />}>
            <PortfolioListSection />
          </Suspense>
        </section>
      )}
      {currentTab === LIKE_TAB.PRODUCT && (
        <section className='bg-black-1 min-h-full'>
          <Suspense
            fallback={
              <div className='bg-black-1 h-full'>
                <ProductFrameListSkeleton length={6} />
              </div>
            }
          >
            <ProductListSection />
          </Suspense>
        </section>
      )}
    </div>
  );
}
