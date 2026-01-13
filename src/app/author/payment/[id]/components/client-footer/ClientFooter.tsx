'use client';

import { BottomCTAButton } from '@/ui';

export default function ClientFooter() {
  const handlePaymentRequest = () => {
    //TODO: 결제 요청 로직
  };
  return (
    <BottomCTAButton className='bg-black-1 fixed-center bottom-[2rem] px-[2rem]'>
      <BottomCTAButton.Single onClick={handlePaymentRequest}>결제 요청하기</BottomCTAButton.Single>
    </BottomCTAButton>
  );
}
