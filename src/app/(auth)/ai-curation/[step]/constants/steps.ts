export const TOTAL_STEP_COUNT = 5;

export const isAiCurationStep = (step: number): boolean => {
  return step >= 1 && step <= TOTAL_STEP_COUNT;
};

export const getProgress = (step: number) => {
  return Math.round((step / TOTAL_STEP_COUNT) * 100);
};
