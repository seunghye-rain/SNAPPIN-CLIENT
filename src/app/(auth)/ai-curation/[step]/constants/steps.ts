import { Step1, Step2, Step3, Step4, Step5 } from '../components/step-content';

export const AI_CURATION_STEPS = {
  '1': {
    progress: 20,
    title: '어떤 장소 무드를 선호하시나요?',
    StepComponent: Step1,
  },
  '2': {
    progress: 40,
    title: '얼마나 자연스러운 모습을 선호하시나요?',
    StepComponent: Step2,
  },
  '3': {
    progress: 60,
    title: '어떤 질감의 사진을 좋아하시나요?',
    StepComponent: Step3,
  },
  '4': {
    progress: 80,
    title: '어떤 색감의 사진을 선호하시나요?',
    StepComponent: Step4,
  },
  '5': {
    progress: 100,
    title: '어떤 분위기의 사진을 선호하시나요?',
    StepComponent: Step5,
  },
} as const;

type AiCurationStep = keyof typeof AI_CURATION_STEPS;

export const isAiCurationStep = (step: string): step is AiCurationStep => {
  return step in AI_CURATION_STEPS;
};
