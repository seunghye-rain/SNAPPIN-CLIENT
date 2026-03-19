'use client';

import { useRouter } from 'next/navigation';
import { BottomCTAButton } from '@snappin/design-system';
import { useCompleteReservation, useConfirmReservation } from '../api';
import { PHOTOGRAPHERS_ROUTES } from '@/constants/routes/routes';
import { STATE_CODES, StateCode } from '@snappin/shared/types';

type DetailPageBottomCTAProps = {
  reservationId: number;
  date: string;
  status: StateCode;
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

  const { label, disabled, onClick } = getBottomCTAState({
    status,
    isAfterStart,
    reservationId,
    confirmReservation,
    completeReservation,
    moveToPayment: () => router.push(PHOTOGRAPHERS_ROUTES.PAYMENT(reservationId)),
  });

  return (
    <>
      <BottomCTAButton className='bg-black-1 bottom-0' hasPadding fixed>
        <BottomCTAButton.Single disabled={disabled} onClick={onClick}>
          {label}
        </BottomCTAButton.Single>
      </BottomCTAButton>
      <div className='bg-black-1 h-[6.3rem]' />
    </>
  );
}


type BottomCTAStateParams = {
  status: StateCode;
  isAfterStart: boolean;
  reservationId: number;
  confirmReservation: (reservationId: number) => void;
  completeReservation: (reservationId: number) => void;
  moveToPayment: () => void;
};

function getBottomCTAState({
  status,
  isAfterStart,
  reservationId,
  confirmReservation,
  completeReservation,
  moveToPayment,
}: BottomCTAStateParams) {
  switch (status) {
    case STATE_CODES.PHOTOGRAPHER_CHECKING:
      return availableButton('결제 요청하기', moveToPayment);
    case STATE_CODES.PAYMENT_COMPLETED:
      return availableButton('예약 확정하기', () => {
        confirmReservation(reservationId);
      });
    case STATE_CODES.RESERVATION_CONFIRMED:
      return isAfterStart
        ? availableButton('촬영 완료하고 리뷰 요청하기', () => {
            completeReservation(reservationId);
          })
        : disabledButton('예약 확정');
    case STATE_CODES.PAYMENT_REQUESTED:
      return disabledButton('결제 요청 중');
    case STATE_CODES.SHOOT_COMPLETED:
      return disabledButton('리뷰 요청 완료');
    case STATE_CODES.RESERVATION_CANCELED:
      return disabledButton('고객님의 예약 취소');
    case STATE_CODES.RESERVATION_REFUSED:
      return disabledButton('예약 거절 완료');
    case STATE_CODES.RESERVATION_REQUESTED:
      return disabledButton('예약 요청 중');
    default:
      return disabledButton('');
  }
}

const availableButton = (label: string, onClick: () => void) => ({
  label,
  disabled: false,
  onClick,
});

const disabledButton = (label: string) => ({
  label,
  disabled: true,
  onClick: undefined,
});