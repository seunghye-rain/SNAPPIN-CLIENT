'use client';

import { useRouter } from 'next/navigation';
import { match } from 'ts-pattern';
import { BottomCTAButton } from '@/ui';
import { STATE_CODES, StateCode } from '@/types/stateCode';
import { useCompleteReservation, useConfirmReservation } from '../api';
import { PHOTOGRAPHERS_ROUTES } from '@/constants/routes/routes';

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

  const { label, disabled, onClick } = match(status)
    .with(STATE_CODES.PHOTOGRAPHER_CHECKING, () => ({
      label: '결제 요청하기',
      disabled: false,
      onClick: () => {
        router.push(PHOTOGRAPHERS_ROUTES.PAYMENT(reservationId));
      },
    }))
    .with(STATE_CODES.PAYMENT_COMPLETED, () => ({
      label: '예약 확정하기',
      disabled: false,
      onClick: () => {
        confirmReservation(reservationId);
      },
    }))
    .with(STATE_CODES.RESERVATION_CONFIRMED, () =>
      isAfterStart
        ? {
            label: '촬영 완료하고 리뷰 요청하기',
            disabled: false,
            onClick: () => {
              completeReservation(reservationId);
            },
          }
        : {
            label: '예약 확정',
            disabled: true,
          },
    )
    .with(STATE_CODES.PAYMENT_REQUESTED, () => ({
      label: '결제 요청 중',
      disabled: true,
    }))
    .with(STATE_CODES.SHOOT_COMPLETED, () => ({
      label: '리뷰 요청 완료',
      disabled: true,
    }))
    .with(STATE_CODES.RESERVATION_CANCELED, () => ({
      label: '고객님의 예약 취소',
      disabled: true,
    }))
    .with(STATE_CODES.RESERVATION_REFUSED, () => ({
      label: '예약 거절 완료',
      disabled: true,
    }))
    .with(STATE_CODES.RESERVATION_REQUESTED, () => ({
      label: '예약 요청 중',
      disabled: true,
    }))
    .otherwise(() => ({
      label: '',
      disabled: true,
    }));

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
