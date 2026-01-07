'use client';

import { Navigation } from '@/ui';
import { IconSearch, Logo } from '@/assets';
import { cn } from '@/utils/cn';

interface HeaderProps {
  isVisible: boolean;
}

export default function Header({ isVisible }: HeaderProps) {
  const handleClickSearch = () => {
    //TODO: 검색 페이지로 이동
  };

  return (
    <div
      className={cn(
        // ✅ 레이아웃에서 빠짐(공간 안 남음)
        'fixed top-0 left-1/2 z-50 w-full max-w-[45rem] -translate-x-1/2',
        // ✅ 보일 때/숨길 때
        'transition-transform duration-200',
        isVisible ? 'translate-y-0' : '-translate-y-full',
      )}
    >
      <Navigation left={<Logo width={72} />} right={<IconSearch onClick={handleClickSearch} />} />
    </div>
  );
}
