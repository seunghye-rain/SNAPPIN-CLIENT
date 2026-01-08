import { GraphicSuccess, GraphicError } from '@/assets';
import { ModalType } from '../types/modalType';

export type ModalTitle =
  | { type: 'single'; text: string }
  | { type: 'multiple'; text: string[] };

export type ModalContent = {
  icon?: React.ReactNode;
  title: ModalTitle;
  description?: string;
  leftButton: string;
  rightButton: string;
}

export const MODAL_CONTENT: Record<Exclude<ModalType, 'default'>, ModalContent> = {
  'success': {
    icon: <GraphicSuccess />,
    title: { type: 'single', text: '예약 요청이 완료되었어요!' },
    description: "'내 예약'에서 진행 상황을 확인해보세요",
    leftButton: '닫기',
    rightButton: '내 예약 확인',
  },
  'error': {
    icon: <GraphicError />,
    title: { type: 'multiple', text: ['결제 요청에 실패했습니다.', '잠시 후 다시 시도해 주세요.'] },
    leftButton: '닫기',
    rightButton: '결제하기',
  },
}