import { ProductStatus, Receipt, ReservationDetail, ReviewDetail } from './_section';
import NavigationClient from './components/navigation-client/Navigation.client';
import { StateCode } from '@/types/stateCode';
import { BottomCTAButton, Divider } from '@/ui';
import { RESERVATION_DETAIL_MOCK } from './mock/reservationDetail.mock';

export default function Page() {
  //TODO: 서버 데이터 연동( 파라미터에 id 추가)
  const data = RESERVATION_DETAIL_MOCK;

  return (
    <div className='bg-black-3 flex min-h-dvh flex-col'>
      <NavigationClient />
      <div className='relative flex flex-col'>
        <ProductStatus
          id={data.productInfo.id}
          imageUrl={data.productInfo.imageUrl}
          title={data.productInfo.title}
          rate={data.productInfo.rate}
          reviewCount={data.productInfo.reviewCount}
          photographer={data.productInfo.photographer}
          price={data.productInfo.price}
          moods={data.productInfo.moods}
          hasReview={!!data.reviewInfo}
        />
        <Divider thickness='large' color='bg-black-3' />
        <ReservationDetail
          createdAt={data.reservationInfo.createdAt}
          status={data.status as StateCode}
          date={data.reservationInfo.date}
          startTime={data.reservationInfo.startTime}
          durationTime={data.reservationInfo.durationTime}
          place={data.reservationInfo.place}
          peopleCount={data.reservationInfo.peopleCount}
          requestNote={data.reservationInfo.requestNote}
        />

        <Divider thickness='large' color='bg-black-3' />
        <Receipt
          basePrice={data.paymentInfo.basePrice}
          extraPrice={data.paymentInfo.extraPrice}
          totalPrice={data.paymentInfo.totalPrice}
        />
        {data.reviewInfo && (
          <>
            <Divider thickness='large' color='bg-black-3' />
            <ReviewDetail
              id={data.reviewInfo.id}
              reviewer={data.reviewInfo.reviewer}
              rating={data.reviewInfo.rating}
              createdAt={data.reviewInfo.createdAt}
              images={data.reviewInfo.images}
              content={data.reviewInfo.content}
            />
            <div className='bg-black-1 h-[6.3rem]' />
            <BottomCTAButton className='fixed-center bg-black-3 bottom-0 px-[2rem] pt-[0.4rem] pb-[2rem]'>
              <BottomCTAButton.Single
                size='large'
                color='disabled'
                className='bg-black-10/50 caption-12-md text-black-1 w-full'
              >
                메시지 기능은 준비 중 이에요. 조금만 기다려주세요!
              </BottomCTAButton.Single>
            </BottomCTAButton>
          </>
        )}
      </div>
    </div>
  );
}
