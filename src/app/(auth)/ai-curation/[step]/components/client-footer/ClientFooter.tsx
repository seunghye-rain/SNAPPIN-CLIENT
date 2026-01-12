'use client';

import { BottomCTAButton } from '@/ui';
import { useRouter } from 'next/navigation';

type ClientFooterProps = {
  step: number;
};

export default function ClientFooter({ step }: ClientFooterProps) {
  const router = useRouter();
  const handleNextStep = () => {
    router.push(`/ai-curation/${Number(step) + 1}`);
  };

  return (
    <BottomCTAButton>
      <BottomCTAButton.Single color='primary' size='large' onClick={handleNextStep}>
        다음으로
      </BottomCTAButton.Single>
    </BottomCTAButton>
  );
}
