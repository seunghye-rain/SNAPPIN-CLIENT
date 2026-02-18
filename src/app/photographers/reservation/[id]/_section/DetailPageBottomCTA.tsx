'use client';

import { useRouter } from 'next/navigation';
import { BottomCTAButton } from '@/ui';
import { STATE_CODES, StateCode } from '@/types/stateCode';
import { useCompleteReservation, useConfirmReservation } from '../api';
import { PHOTOGRAPHERS_ROUTES } from '@/constants/routes/routes';

type DetailPageBottomCTAProps = {
  reservationId: number;
  date: string;
  status: StateCode;
};

type ButtonConfig = {
  label: string;
  disabled: boolean;
  onClick?: () => void;
};

export default function DetailPageBottomCTA({
  reservationId,
  date,
  status,
}: DetailPageBottomCTAProps) {
  const router = useRouter();
  const { mutate: completeReservation } = useCompleteReservation();
  const { mutate: confirmReservation } = useConfirmReservation();

  const [y, m, d] = date.split('-').map(Number);
  const reservationStart = new Date(y, m - 1, d);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const isAfterStart = today >= reservationStart;

  const labelAndDisabledConfig = (label: string, disabled: boolean): ButtonConfig => ({
    label,
    disabled,
  });

  const getButtonConfig = (): ButtonConfig => {
    if (status === STATE_CODES.PHOTOGRAPHER_CHECKING) {
      return {
        ...labelAndDisabledConfig('결제 요청하기', false),
        onClick: () => {
          router.push(PHOTOGRAPHERS_ROUTES.PAYMENT(reservationId));
        },
      };
    }

    if (status === STATE_CODES.PAYMENT_COMPLETED) {
      return {
        ...labelAndDisabledConfig('예약 확정하기', false),
        onClick: () => {
          confirmReservation(reservationId);
        },
      };
    }

    if (status === STATE_CODES.RESERVATION_CONFIRMED && isAfterStart) {
      return {
        ...labelAndDisabledConfig('촬영 완료하고 리뷰 요청하기', false),
        onClick: () => {
          completeReservation(reservationId);
        },
      };
    }

    switch (status) {
      case STATE_CODES.PAYMENT_REQUESTED:
        return labelAndDisabledConfig('결제 요청 중', true);
      case STATE_CODES.RESERVATION_CONFIRMED:
        return labelAndDisabledConfig('예약 확정', true);
      case STATE_CODES.SHOOT_COMPLETED:
        return labelAndDisabledConfig('리뷰 요청 완료', true);
      case STATE_CODES.RESERVATION_CANCELED:
        return labelAndDisabledConfig('고객님의 예약 취소', true);
      case STATE_CODES.RESERVATION_REFUSED:
        return labelAndDisabledConfig('예약 거절 완료', true);
      default:
        return labelAndDisabledConfig('', true);
    }
  };

  const { label, disabled, onClick } = getButtonConfig();

  return (
    <>
      <BottomCTAButton className='bg-black-1 fixed-center bottom-0' hasPadding>
        <BottomCTAButton.Single disabled={disabled} onClick={onClick}>
          {label}
        </BottomCTAButton.Single>
      </BottomCTAButton>
      <div className='bg-black-1 h-[6.3rem]' />
    </>
  );
}
