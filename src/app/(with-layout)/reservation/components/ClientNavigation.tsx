'use client';

import { Navigation } from '@/ui';
import { Logo, IconSearch } from '@/assets';
import { cn } from '@/utils/cn';

type ClientNavigationProps = {
  isVisible?: boolean;
};

export default function ClientNavigation({ isVisible = true }: ClientNavigationProps) {
  const handleSearchClick = () => {
    //TODO: 검색 페이지
  };

  return (
    <div
      className={cn(
        'fixed-center top-0 z-15 transition-transform duration-300 ease-out will-change-transform',
        isVisible ? 'translate-y-0' : '-translate-y-full',
      )}
    >
      <Navigation left={<Logo width={72} />} right={<IconSearch onClick={handleSearchClick} />} />
    </div>
  );
}
