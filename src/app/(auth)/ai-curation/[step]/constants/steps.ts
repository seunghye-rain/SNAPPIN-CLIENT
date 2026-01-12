import { STEP1_MOCK, STEP2_MOCK, STEP3_MOCK, STEP4_MOCK, STEP5_MOCK } from '../mock/steps.mock';

export const AI_CURATION_STEPS = [
  STEP1_MOCK,
  STEP2_MOCK,
  STEP3_MOCK,
  STEP4_MOCK,
  STEP5_MOCK,
] as const;

export type AiCurationStep = number;

export const STEP_COUNT = AI_CURATION_STEPS.length;

export const isAiCurationStep = (step: number): boolean => {
  return step >= 1 && step <= STEP_COUNT;
};

export const getStepInfo = (step: AiCurationStep) => {
  const index = step - 1;
  const total = STEP_COUNT;

  return {
    index,
    total,
    progress: Math.round(((index + 1) / total) * 100),
    question: AI_CURATION_STEPS[index].question,
    photos: AI_CURATION_STEPS[index].photos,
  };
};
