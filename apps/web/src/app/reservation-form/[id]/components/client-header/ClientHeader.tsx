'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IconArrowBack } from '@snappin/design-system/assets';
import { IconButton, Navigation } from '@snappin/design-system';
import CancelModal from '../../@modal/(.)cancel-modal/CancelModal';

export default function ClientHeader() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleBackClick = () => {
    setOpen(true);
  };

  const handleExit = () => {
    router.back();
    setOpen(false);
  };

  return (
    <>
      <Navigation
        left={
          <IconButton onClick={handleBackClick} className='h-[2.4rem] w-[2.4rem]'>
            <IconArrowBack />
          </IconButton>
        }
        center={
          <span className='font-16-bd text-black-10 block max-w-[20rem] truncate'>
            예약 신청 양식 작성하기
          </span>
        }
        className='border-black-5 border-b'
        isFixed
      />
      <CancelModal open={open} handleOpenChange={setOpen} handleClickExit={handleExit} />
    </>
  );
}
