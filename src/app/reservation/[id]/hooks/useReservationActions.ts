import { useState } from 'react';
import { useToast } from '@/ui/toast/hooks/useToast';
import { useCancelReservation, useRequestPayment } from '../api';

type UseReservationActionsProps = {
  reservationId: number;
  hasBottomCta: boolean;
};

export const useReservationActions = ({
  reservationId,
  hasBottomCta,
}: UseReservationActionsProps) => {
  const [cancelOpen, setCancelOpen] = useState(false);
  const toast = useToast();

  const { mutate: cancelReservationMutation } = useCancelReservation(reservationId);
  const { mutate: requestPaymentMutation, isPending: isPaymentRequestPending } =
    useRequestPayment(reservationId);

  const handleReservationCancelClick = () => setCancelOpen(true);

  const handleReservationCancel = () => {
    cancelReservationMutation(reservationId, {
      onSuccess: () => setCancelOpen(false),
      onError: () =>
        toast.error(
          '예약 취소 중 오류가 발생했습니다. 다시 시도해주세요.',
          undefined,
          'bottom-[8rem]',
        ),
    });
  };

  const handlePaymentConfirmClick = () => {
    if (isPaymentRequestPending) return;
    requestPaymentMutation(reservationId, {
      onError: () =>
        toast.error(
          '결제 요청 중 오류가 발생했습니다. 다시 시도해주세요.',
          undefined,
          'bottom-[8rem]',
        ),
    });
  };

  const handleInquiryClick = () => {
    toast.alert(
      '메시지 기능은 준비 중이에요. 조금만 기다려주세요!',
      undefined,
      hasBottomCta ? 'bottom-[8.4rem]' : 'bottom-[2rem]',
    );
  };

  return {
    cancelOpen,
    setCancelOpen,
    isPaymentRequestPending,
    handleReservationCancelClick,
    handleReservationCancel,
    handlePaymentConfirmClick,
    handleInquiryClick,
  };
};
