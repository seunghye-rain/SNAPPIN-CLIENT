'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { BottomDrawer, DrawerDescription, DrawerTitle } from '@snappin/design-system';
import { EXPLORE_SORT_LABEL, EXPLORE_SORT_OPTIONS, ExploreSort } from '../../constants/sort';
import { resolveExploreSort } from '../../utils/query';

type ReservationBottomDrawerProps = {
  isOpen: boolean;
  handleOpenChangeAction: () => void;
};

export default function SortDrawer({
  isOpen,
  handleOpenChangeAction,
}: ReservationBottomDrawerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentSort = resolveExploreSort(searchParams.get('sort'));

  const handleSelectSort = (sort: ExploreSort) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', sort);

    const nextUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    router.replace(nextUrl);
    handleOpenChangeAction();
  };

  return (
    <BottomDrawer
      isOpen={isOpen}
      handleOpenChange={handleOpenChangeAction}
      className='max-h-[42dvh]!'
    >
      <DrawerTitle className='sr-only'>정렬 옵션 선택</DrawerTitle>
      <DrawerDescription className='sr-only'>
        정렬 옵션을 선택하는 드로어입니다. 원하는 정렬을 선택하면 바로 적용됩니다.
      </DrawerDescription>
      <BottomDrawer.Section className='flex h-[29rem] flex-col gap-[0.6rem]'>
        <BottomDrawer.Title className='py-[2rem] text-center'>포트폴리오 정렬</BottomDrawer.Title>
        {EXPLORE_SORT_OPTIONS.map((option) => (
          <SortOption
            key={option}
            label={EXPLORE_SORT_LABEL[option]}
            isSelected={currentSort === option}
            onClick={() => handleSelectSort(option)}
          />
        ))}
      </BottomDrawer.Section>
    </BottomDrawer>
  );
}

const SortOption = ({
  label,
  isSelected,
  onClick,
}: {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      type='button'
      aria-label={label}
      aria-pressed={isSelected}
      onClick={onClick}
      className='text-black-9 font-16-md py-[2rem] text-center'
    >
      {label}
    </button>
  );
};
