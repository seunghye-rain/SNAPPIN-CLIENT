import { Button, BottomCTAButton } from '@/ui';
import { useToast } from '@/ui/toast/hooks/useToast';
import { useAuth } from '@/auth/hooks/useAuth';
import { overlay } from 'overlay-kit';
import ReservationBottomDrawer from '@/app/product-detail/[productId]/components/reservation-bottom-drawer/ReservationBottomDrawer';

type FooterProps = {
  productId: string;
  amount: number;
};

export default function Footer({ productId, amount }: FooterProps) {
  const { isLogIn } = useAuth();
  const { alert, login } = useToast();
  const toastStyle = 'px-[2rem] bottom-[8.4rem]';

  const handleContact = () => {
    if (isLogIn) {
      alert('메시지 기능은 준비 중이에요. 조금만 기다려주세요!', undefined, toastStyle);
    } else {
      login('문의 기능은 로그인 후에 사용할 수 있어요.', undefined, toastStyle);
    }
  };

  const handleReservation = () => {
    if (isLogIn) {
      overlay.open(({ isOpen, close }) => (
        <ReservationBottomDrawer
          isOpen={isOpen}
          productId={productId}
          amount={amount}
          handleOpenChangeAction={close}
          onFormSubmitAction={handleSubmit}
        />
      ));
    } else {
      login('예약 기능은 로그인 후에 사용할 수 있어요.', undefined, toastStyle);
    }
  };

  // TODO: 예약 로직
  const handleSubmit = () => {};

  return (
    <>
      <BottomCTAButton
        className='bg-black-1 bottom-0 w-full max-w-[45rem] px-[2rem] pt-[0.8rem] pb-[2.4rem]'
        fixed={true}
      >
        <BottomCTAButton.Double
          leftButton={
            <Button color='white' size='medium' onClick={handleContact}>
              문의하기
            </Button>
          }
          rightButton={
            <Button color='black' size='medium' onClick={handleReservation}>
              예약하기
            </Button>
          }
        />
      </BottomCTAButton>
    </>
  );
}
