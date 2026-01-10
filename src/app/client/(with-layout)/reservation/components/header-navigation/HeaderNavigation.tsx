'use client';

import { IconSearch, Logo } from '@/assets';
import { Navigation } from '@/ui';

export default function HeaderNavigation() {
  const handleSearchClick = () => {
    // 검색페이지
  };

  return (
    <Navigation
      isFixed={true}
      left={<Logo width={72} />}
      right={<IconSearch onClick={handleSearchClick} />}
    />
  );
}
