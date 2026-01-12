'use client';

import { useEffect } from 'react';
import type { AiCurationStep } from './constants/steps';
import { useAiCuration } from '../hooks/useAiCuration';

export default function StepShell({
  step,
  children,
}: {
  step: AiCurationStep;
  children: React.ReactNode;
}) {
  const { setCurrentStep } = useAiCuration();

  useEffect(() => {
    setCurrentStep(step);
  }, [step, setCurrentStep]);

  return <>{children}</>;
}
