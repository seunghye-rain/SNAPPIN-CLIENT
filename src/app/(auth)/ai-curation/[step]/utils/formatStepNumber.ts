/**
 * 스텝 번호를 2자리로 포맷팅하는 함수
 * @param step 스텝 번호
 * @returns 포맷팅된 스텝 번호 (ex. 1 -> "01")
 */
export const formatStepNumber = (step: number): string => {
  return String(step).padStart(2, '0');
};
