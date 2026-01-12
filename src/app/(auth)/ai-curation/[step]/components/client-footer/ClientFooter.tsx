'use client';

import { BottomCTAButton } from '@/ui';
import { useRouter } from 'next/navigation';
import type { AiCurationStep } from '../../constants/steps';
import { useAiCuration } from '../../../hooks/useAiCuration';
import { useToast } from '@/ui/toast/hooks/useToast';

type ClientFooterProps = {
  step: AiCurationStep;
};

export default function ClientFooter({ step }: ClientFooterProps) {
  const router = useRouter();
  const { error } = useToast();
  const { selectedByStep } = useAiCuration();

  const isSelected = selectedByStep[step] != null;
  const isLast = step === '5';

  const handleNextStep = () => {
    if (!isSelected) {
      error('이미지를 선택해주세요.');

      console.log('이미지를 선택해주세요.');
      return;
    }

    if (isLast) router.push('/ai-curation/result');
    else router.push(`/ai-curation/${String(Number(step) + 1)}`);
  };

  return (
    <BottomCTAButton>
      <BottomCTAButton.Single color='primary' size='large' onClick={handleNextStep}>
        {isLast ? '결과 보기' : '다음으로'}
      </BottomCTAButton.Single>
    </BottomCTAButton>
  );
}
