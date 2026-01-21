import { Button, BottomCTAButton, ResultModal } from '@/ui';
import { useToast } from '@/ui/toast/hooks/useToast';
import { useAuth } from '@/auth/hooks/useAuth';
import { overlay } from 'overlay-kit';
import ReservationBottomDrawer from '@/app/product-detail/[productId]/components/reservation-bottom-drawer/ReservationBottomDrawer';
import { useRouter } from 'next/navigation';

type FooterProps = {
  productId: string;
  amount: number;
};

export default function Footer({ productId, amount }: FooterProps) {
  const router = useRouter();
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
    if (!isLogIn) {
      login('예약 기능은 로그인 후에 사용할 수 있어요.', undefined, toastStyle);
      return;
    }

    overlay.open(({ isOpen, close }) => (
      <ReservationBottomDrawer
        isOpen={isOpen}
        productId={productId}
        amount={amount}
        handleOpenChangeAction={() => close()} // ✅ close를 함수로 넘기기
        onSuccessReservationAction={() => {
          overlay.open(({ isOpen, close }) => (
            <ResultModal
              open={isOpen}
              handleOpenChange={close}
              showCloseButton={false}
              type='success'
              title='예약 요청이 완료되었어요!'
              description="'내 예약'에서 진행 상황을 확인해보세요"
              buttons={[
                {
                  label: '닫기',
                  size: 'medium',
                  color: 'disabled',
                  onClick: close,
                },
                {
                  label: '내 예약 확인',
                  size: 'medium',
                  color: 'black',
                  onClick: () => router.push('/reservation'),
                },
              ]}
            />
          ));
        }}
      />
    ));
  };

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
