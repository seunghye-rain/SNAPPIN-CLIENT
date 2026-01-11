'use client';

import { IconSearch, Logo } from '@/assets';
import { Navigation } from '@/ui';

export default function HeaderNavigation() {
  const handleSearchClick = () => {
    // 검색페이지
  };

  return (
    <>
      <Navigation
        left={<Logo width={72} />}
        right={<IconSearch onClick={handleSearchClick} />}
        className='fixed-center top-0 z-10'
      />
      <div className='bg-black-1 h-[5rem] flex-none' />
    </>
  );
}
