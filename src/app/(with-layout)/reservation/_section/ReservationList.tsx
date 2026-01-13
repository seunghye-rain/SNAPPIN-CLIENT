'use client';

import { Fragment, useEffect } from 'react';
import { Divider, SectionTabs } from '@/ui';
import { RESERVATION_MOCK } from '../mock/reservationList.mock';
import { RESERVATION_TABS, type ReservationTabValue } from '../constants/tabs';
import { EmptyView, ReservationCard } from '../components';
import type { MoodCode } from '@/types/moodCode';
import { STATE_CODES, type StateCode } from '@/types/stateCode';
import { formatCreatedAt } from '@/utils/formatNumberWithComma';
import { useRouter, useSearchParams } from 'next/navigation';

export default function ReservationList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabQueryValue = searchParams.get('tab');

  const defaultTabValue = RESERVATION_TABS[0].value;
  const selectedTabValue = (tabQueryValue ?? defaultTabValue) as ReservationTabValue;

  useEffect(() => {
    if (tabQueryValue) {
      return;
    }

    router.replace(`?tab=${defaultTabValue}`, { scroll: false });
  }, [defaultTabValue, router, tabQueryValue]);

  const handleTabValueChange = (value: string) => {
    router.replace(`?tab=${value}`, { scroll: false });
  };

  //TODO: 서버 데이터 연동, 파라미터에 selectedTabValue 추가
  const { reservations } = RESERVATION_MOCK;
  const reservationsByTabValue = reservations.filter(({ reservation }) =>
    selectedTabValue === 'CLIENT_DONE'
      ? reservation.status === STATE_CODES.SHOOT_COMPLETED
      : reservation.status !== STATE_CODES.SHOOT_COMPLETED,
  );
  const emptyTitle =
    selectedTabValue === 'CLIENT_DONE' ? '촬영 완료한 상품이 없어요' : '예약 문의한 상품이 없어요';

  return (
    <SectionTabs
      value={selectedTabValue}
      handleValueChange={handleTabValueChange}
      className='bg-black-1'
    >
      <SectionTabs.List className={'bg-black-1 border-black-4 fixed z-10 border-t'}>
        {RESERVATION_TABS.map((tab) => (
          <SectionTabs.Tab key={tab.value} value={tab.value}>
            {tab.label}
          </SectionTabs.Tab>
        ))}
      </SectionTabs.List>

      <SectionTabs.Contents value={selectedTabValue}>
        {reservationsByTabValue.length === 0 ? (
          <EmptyView title={emptyTitle} description='탐색에서 다양한 포트폴리오를 확인해보세요' />
        ) : (
          <div className='mt-[4.5rem] flex flex-col p-[2rem]'>
            {reservationsByTabValue.map(({ reservation }, reservationIndex) => (
              <Fragment key={reservation.reservationId}>
                <ReservationCard
                  image={{
                    src: reservation.product.imageUrl,
                    alt: reservation.product.title,
                  }}
                  date={formatCreatedAt(reservation.createdAt)}
                  name={reservation.product.title}
                  rating={reservation.product.rate}
                  reviewCount={reservation.product.reviewCount}
                  author={reservation.product.photographer}
                  price={reservation.product.price}
                  tags={reservation.product.moods as MoodCode[]}
                  isReviewed={reservation.product.isReviewed}
                  reviewHref={`/photo-completed/${reservation.reservationId}`}
                  status={reservation.status as StateCode}
                  href={
                    selectedTabValue === 'CLIENT_DONE'
                      ? `/photo-completed/${reservation.reservationId}`
                      : `/reservation-detail/${reservation.reservationId}`
                  }
                />
                {reservationIndex !== reservationsByTabValue.length - 1 ? (
                  <div className='-mx-[2rem] py-[1.2rem]'>
                    <Divider className='h-[0.6rem]' color='bg-black-3' />
                  </div>
                ) : null}
              </Fragment>
            ))}
          </div>
        )}
      </SectionTabs.Contents>
    </SectionTabs>
  );
}
