'use client';

import { BottomDrawer, DrawerDescription, DrawerTitle } from '@snappin/design-system';

type ReservationBottomDrawerProps = {
  isOpen: boolean;
  handleOpenChangeAction: () => void;
};

export default function SortDrawer({
  isOpen,
  handleOpenChangeAction,
}: ReservationBottomDrawerProps) {
  return (
    <BottomDrawer
      isOpen={isOpen}
      handleOpenChange={handleOpenChangeAction}
      className='max-h-[42dvh]!'
    >
      {/* 접근성 위한 title & description (숨김처리) */}
      <DrawerTitle className='sr-only'>정렬 옵션 선택</DrawerTitle>
      <DrawerDescription className='sr-only'>
        정렬 옵션을 선택하는 드로어입니다. 적용 버튼을 눌러 선택한 옵션을 적용할 수 있습니다.
      </DrawerDescription>
      <BottomDrawer.Section className='flex h-[29rem] flex-col gap-[0.6rem]'>
        <BottomDrawer.Title className='py-[2rem] text-center'>포트폴리오 정렬</BottomDrawer.Title>
        {['추천순', '인기순', '최신순'].map((option) => (
          <SortOption key={option}>{option}</SortOption>
        ))}
      </BottomDrawer.Section>
    </BottomDrawer>
  );
}

const SortOption = ({ children }: { children: React.ReactNode }) => {
  return <div className='text-black-9 font-16-md py-[2rem] text-center'>{children}</div>;
};
