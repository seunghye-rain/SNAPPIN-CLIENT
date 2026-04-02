'use client';

import { useRouter } from 'next/navigation';
import { BottomCTAButton } from '@snappin/design-system';
import { ROUTES } from '@/constants/routes/routes';
import { TOTAL_STEP_COUNT } from '../../constants/onBoardingSteps';
import type { OnBoardingStep } from '../../types/onBoardingStep';
import { useOnBoardingFormContext } from '../../hooks/useOnBoardingFormContext';

type ClientFooterProps = {
  step: number;
  triggerFields: OnBoardingStep['triggerFields'];
};

export default function ClientFooter({ step, triggerFields }: ClientFooterProps) {
  const router = useRouter();
  const { trigger } = useOnBoardingFormContext();

  const isLast = step === TOTAL_STEP_COUNT;

  const handleNextStep = async () => {
    const isValid = await trigger([...triggerFields]);

    if (!isValid) return;

    if (isLast) {
      router.push(ROUTES.ON_BOARDING_FINAL);
      //TODO: API 연동
    } else {
      router.push(ROUTES.ON_BOARDING(step + 1));
    }
  };

  return (
    <BottomCTAButton fixed className='px-[2.7rem] pb-[2.8rem]'>
      <BottomCTAButton.Single color='black' size='large' onClick={handleNextStep}>
        다음
      </BottomCTAButton.Single>
    </BottomCTAButton>
  );
}
