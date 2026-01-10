'use client';

import type { ComponentProps } from 'react';

import { RESERVATION_MOCK } from '@/app/client/(with-layout)/reservation/mock/reservationList.mock';
import type { StateCode } from '@/types/stateCode';
import { Button, ProductCard } from '@/ui';

type ReservationRequestedProps = {
  reservationProductId: number;
  reservationStatus: StateCode;
  handleReservationCancelClick: () => void;
  handleInquiryClick: () => void;
  handleReviewCreateClick: () => void;
};

type ReservationMockProduct = (typeof RESERVATION_MOCK.products)[number];

const createProductCardPropsByReservationProduct = (
  reservationProduct: ReservationMockProduct,
): ComponentProps<typeof ProductCard> => ({
  image: {
    src: reservationProduct.imageUrl,
    alt: `${reservationProduct.title} 상품 이미지`,
  },
  name: reservationProduct.title,
  rating: reservationProduct.rate,
  reviewCount: reservationProduct.reviewCount,
  author: reservationProduct.photographer,
  price: reservationProduct.price,
  tags: reservationProduct.moods,
  className: 'w-full',
});

export default function ReservationRequested({
  reservationProductId,
  reservationStatus,
  handleReservationCancelClick,
  handleInquiryClick,
  handleReviewCreateClick,
}: ReservationRequestedProps) {
  const selectedReservationProduct =
    RESERVATION_MOCK.products.find(({ id }) => id === reservationProductId) ??
    RESERVATION_MOCK.products[0];

  const reservationProducts = selectedReservationProduct ? [selectedReservationProduct] : [];
  const hasReservationCancelButton = reservationStatus !== 'RESERVATION_CANCELED';
  const inquiryButtonLabel = reservationStatus === 'SHOOT_COMPLETED' ? '리뷰 작성' : '문의하기';
  const handleInquiryButtonClick =
    reservationStatus === 'SHOOT_COMPLETED' ? handleReviewCreateClick : handleInquiryClick;
  const inquiryButtonColor = reservationStatus === 'RESERVATION_CANCELED' ? 'transparent' : 'black';

  return (
    <section className='bg-black-1 px-[2rem] pt-[1.7rem] pb-[1.2rem]'>
      <label className='caption-14-bd text-black-10'>예약 요청 상품</label>
      <div className='mt-[1.2rem] mb-[1.7rem]'>
        {reservationProducts.map((reservationProduct) => (
          <ProductCard
            key={reservationProduct.id}
            {...createProductCardPropsByReservationProduct(reservationProduct)}
          />
        ))}
      </div>
      <div className='flex flex-row gap-[0.6rem]'>
        {hasReservationCancelButton ? (
          <Button
            size='small'
            color='white'
            display='inline'
            type='button'
            className='w-full'
            onClick={handleReservationCancelClick}
          >
            예약 취소
          </Button>
        ) : null}
        <Button
          size='small'
          color={inquiryButtonColor}
          display='inline'
          type='button'
          className='w-full'
          onClick={handleInquiryButtonClick}
        >
          {inquiryButtonLabel}
        </Button>
      </div>
    </section>
  );
}
