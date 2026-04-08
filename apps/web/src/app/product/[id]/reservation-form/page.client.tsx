'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes/routes';
import CancelModal from './@modal/(.)cancel-modal/CancelModal';
import CopyModal from './@modal/(.)copy-modal/CopyModal';
import { ReservationFormWrapper } from './_form';
import { ClientHeader } from './components';

type PageClientProps = {
  photographerId: number;
};

export default function PageClient({ photographerId }: PageClientProps) {
  const router = useRouter();
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isCopyModalOpen, setIsCopyModalOpen] = useState(false);

  const handleBackClick = () => {
    setIsCancelModalOpen(true);
  };

  const handleExit = () => {
    router.back();
    setIsCancelModalOpen(false);
  };

  const handleCopySuccess = () => {
    setIsCopyModalOpen(true);
  };

  const handleMovePhotographer = () => {
    setIsCopyModalOpen(false);
    router.push(ROUTES.PHOTOGRAPHER(photographerId));
  };

  return (
    <>
      <ClientHeader handleClickBack={handleBackClick} />
      <ReservationFormWrapper handleCopySuccess={handleCopySuccess} />

      <CancelModal
        open={isCancelModalOpen}
        handleOpenChange={setIsCancelModalOpen}
        handleClickExit={handleExit}
      />
      <CopyModal
        open={isCopyModalOpen}
        handleOpenChange={setIsCopyModalOpen}
        handleClickConfirm={handleMovePhotographer}
      />
    </>
  );
}
