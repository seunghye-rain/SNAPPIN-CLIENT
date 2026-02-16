import { StateCode } from '@/types/stateCode';

type ReservationStatus = {
  navigationTitle: string;
  hasBottomCta: boolean;
  hasPaymentDetailSection: boolean;
};

export const STATUS_CONFIG = {
  RESERVATION_REQUESTED: {
    navigationTitle: '예약 상세',
    hasBottomCta: false,
    hasPaymentDetailSection: false,
  },
  PHOTOGRAPHER_CHECKING: {
    navigationTitle: '예약 상세',
    hasBottomCta: false,
    hasPaymentDetailSection: false,
  },
  PAYMENT_REQUESTED: {
    navigationTitle: '예약 상세',
    hasBottomCta: true,
    hasPaymentDetailSection: true,
  },
  PAYMENT_COMPLETED: {
    navigationTitle: '예약 상세',
    hasBottomCta: true,
    hasPaymentDetailSection: true,
  },
  RESERVATION_CONFIRMED: {
    navigationTitle: '예약 상세',
    hasBottomCta: false,
    hasPaymentDetailSection: false,
  },
  RESERVATION_REFUSED: {
    navigationTitle: '예약 상세',
    hasBottomCta: true,
    hasPaymentDetailSection: false,
  },
  RESERVATION_CANCELED: {
    navigationTitle: '예약 상세',
    hasBottomCta: true,
    hasPaymentDetailSection: false,
  },
  SHOOT_COMPLETED: {
    navigationTitle: '촬영 내역',
    hasBottomCta: false,
    hasPaymentDetailSection: true,
  },
} as const satisfies Record<StateCode, ReservationStatus>;
