import { ModalButtonProps } from '../../base/Modal';
import { DefaultModalType } from '../types/type';

export type Buttons = ModalButtonProps[];

export const BUTTONS: Record<Exclude<DefaultModalType, 'default'>, Buttons> = {
  'success': [
    { label: '닫기', size: 'medium', color: 'disabled' },
    { label: '결제하기', size: 'medium', color: 'black' },
  ],
  'error': [
    { label: '닫기', size: 'medium', color: 'disabled' },
    { label: '내 예약 확인', size: 'medium', color: 'black' },
  ],
}