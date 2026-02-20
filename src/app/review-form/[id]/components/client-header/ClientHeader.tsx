'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CancelModal from '../../@modal/(.)cancel-modal/CancelModal';
import { ROUTES } from '@/constants/routes/routes';
import DetailHeader from '@/components/layout/detail/DetailHeader';

export default function ClientHeader() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<'home' | 'back' | null>(null);

  const handleOpenModal = (action: 'home' | 'back') => {
    setPendingAction(action);
    setOpen(true);
  };

  const handleConfirm = () => {
    if (pendingAction === 'home') {
      router.push(ROUTES.HOME);
    }
    if (pendingAction === 'back') {
      router.back();
    }
    setOpen(false);
    setPendingAction(null);
  };

  return (
    <>
      <DetailHeader
        handleBackClick={() => handleOpenModal('back')}
        handleHomeClick={() => handleOpenModal('home')}
      >
        리뷰 작성
      </DetailHeader>
      <CancelModal open={open} handleOpenChange={setOpen} handleClickConfirm={handleConfirm} />
    </>
  );
}
