'use client';

import { overlay } from 'overlay-kit';
import SortDrawer from '@/app/(with-layout)/explore/components/Sort-Drawer/SortDrawer';

export default function ExploreResultToolbar() {
  const count = 100;

  return (
    <div className='flex flex-row items-center justify-between px-[2rem] py-[1.25rem]'>
      <span className='caption-12-md text-black-7'>{`검색 결과 ${count}개`}</span>
      <button
        type='button'
        aria-label='정렬 버튼'
        className='bg-black-1 border-black-4 rounded-[0.4rem] border-[0.1rem] px-[1rem] py-[0.6rem]'
        onClick={() =>
          overlay.open(({ isOpen, close }) => (
            <SortDrawer isOpen={isOpen} handleOpenChangeAction={close} />
          ))
        }
      >
        <span className='caption-10-md text-black-8 w-[6.1rem]'>추천순</span>
      </button>
    </div>
  );
}
