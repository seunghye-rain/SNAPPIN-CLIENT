'use client';

import { useRouter } from 'next/navigation';
import { BottomCTAButton } from '@/ui';

export default function ClientFooter() {
  const router = useRouter();

  const handleEnrollReview = () => {
    // TODO: 촬영 완료 상세 페이지로 이동
    router.push('/');
  };

  return (
    <BottomCTAButton background='white' hasPadding fixed>
      <BottomCTAButton.Single color='primary' size='large' onClick={handleEnrollReview}>
        등록하기
      </BottomCTAButton.Single>
    </BottomCTAButton>
  );
}
