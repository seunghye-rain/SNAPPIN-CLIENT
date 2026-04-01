'use client';

import { useState } from 'react';
import { BottomCTAButton } from '@snappin/design-system';
import CopyModal from '../../@modal/(.)copy-modal/CopyModal';

type ClientFooterProps = {
  disabled?: boolean;
  handleClick?: () => void;
};

export default function ClientFooter({ disabled = false, handleClick }: ClientFooterProps) {
  const [open, setOpen] = useState(false);

  const handleCopyButtonClick = () => {
    handleClick?.();
    setOpen(true);
  };

  const handleCopyModalConfirm = () => {
    setOpen(false);
  };

  return (
    <>
      <div className='h-[8.4rem]'>
        <BottomCTAButton background='white' hasPadding fixed>
          <BottomCTAButton.Single
            color='black'
            size='large'
            disabled={disabled}
            onClick={handleCopyButtonClick}
          >
            신청 양식 복사하기
          </BottomCTAButton.Single>
        </BottomCTAButton>
      </div>
      <CopyModal open={open} handleOpenChange={setOpen} handleClickConfirm={handleCopyModalConfirm} />
    </>
  );
}
