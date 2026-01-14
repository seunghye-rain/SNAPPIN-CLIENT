'use client';

import { IconButton, Navigation, SectionTabs } from '@/ui';
import { LIKE_TAB, LIKE_TAB_MAP } from '@/app/(with-layout)/like/constants/tab';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { EXPLORE_TAB } from '@/app/(with-layout)/explore/constants/tab';
import { IconSearch, Logo } from '@/assets';
import PortfolioListSection from '@/app/(with-layout)/like/_section/PortfolioListSection';
import ProductListSection from '@/app/(with-layout)/like/_section/ProductListSection';
import { useAuth } from '@/auth/hooks/useAuth';
import { useToast } from '@/ui/toast/hooks/useToast';

const isLikeTab = (value: string | null) => {
  return value === LIKE_TAB.PORTFOLIO || value === LIKE_TAB.PRODUCT;
};

export default function PageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isLogIn } = useAuth();
  const toast = useToast();

  const currentTab = useMemo(() => {
    const raw = searchParams.get('tab');
    return isLikeTab(raw) ? raw : EXPLORE_TAB.PORTFOLIO;
  }, [searchParams]);

  const handleTabChange = (nextTab: string) => {
    if (!isLikeTab(nextTab)) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', nextTab);

    router.push(`?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    if (isLogIn) return;
    toast.login('좋아요 기능은 로그인 후에 사용할 수 있어요.', undefined, 'bottom-[8.6rem]');
  }, [isLogIn, toast]);

  return (
    <SectionTabs value={currentTab} handleValueChange={handleTabChange} className='h-full min-h-0'>
      <div className='bg-black-1 sticky top-0 z-10 shrink-0'>
        <Navigation
          className='items-center py-0'
          left={<Logo width={82} className='cursor-pointer' />}
          right={
            <IconButton>
              <IconSearch />
            </IconButton>
          }
        />
        <SectionTabs.List>
          <SectionTabs.Tab value={LIKE_TAB.PORTFOLIO}>
            {LIKE_TAB_MAP[LIKE_TAB.PORTFOLIO]}
          </SectionTabs.Tab>
          <SectionTabs.Tab value={LIKE_TAB.PRODUCT}>
            {LIKE_TAB_MAP[LIKE_TAB.PRODUCT]}
          </SectionTabs.Tab>
        </SectionTabs.List>
      </div>
      <main className='scrollbar-hide min-h-0 overflow-y-hidden'>
        <SectionTabs.Contents value={LIKE_TAB.PORTFOLIO} className='min-h-full'>
          {/* 포트폴리오 목록 */}
          <PortfolioListSection />
        </SectionTabs.Contents>

        <SectionTabs.Contents value={LIKE_TAB.PRODUCT} className='bg-black-3 min-h-full'>
          {/* 상품 목록 */}
          <ProductListSection />
        </SectionTabs.Contents>
      </main>
    </SectionTabs>
  );
}
