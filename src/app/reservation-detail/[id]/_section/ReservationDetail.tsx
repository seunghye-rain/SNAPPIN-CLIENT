'use client';

import { DetailRow } from '../components';
import { StateChip } from '@/ui';
import type { StateCode } from '@/types/stateCode';

type ReservationDetailProps = {
  reservationStatus: StateCode;
  reservationInfo: {
    date: string;
    startTime: string;
    durationTime: number;
    place: string;
    peopleCount: number;
    requestNote: string;
  };
};

const formatDuration = (durationTime: number) => {
  const hours = Math.floor(durationTime / 60);
  const minutes = durationTime % 60;

  return hours === 0 ? `${minutes}분` : minutes === 0 ? `${hours}시간` : `${hours}.5시간`;
};

const formatDate = (date: string, startTime: string) => {
  const [year, month, day] = date.split('-').map(Number);
  const [hour, minute] = startTime.split(':').map(Number);

  const hasValidDate = ![year, month, day].some((value) => Number.isNaN(value));
  const hasValidTime = ![hour, minute].some((value) => Number.isNaN(value));

  return hasValidDate && hasValidTime
    ? `${month}/${day} ${hour < 12 ? '오전' : '오후'} ${hour % 12 === 0 ? 12 : hour % 12}시${
        minute === 0 ? '' : ` ${minute}분`
      }`
    : `${date} ${startTime}`;
};

export default function ReservationDetail({
  reservationStatus,
  reservationInfo,
}: ReservationDetailProps) {
  const { date, startTime, durationTime, place, peopleCount, requestNote } = reservationInfo;

  return (
    <section className='bg-black-1 px-[2rem] pt-[1.7rem] pb-[2.4rem]'>
      <div className='flex justify-between'>
        <span className='caption-14-bd text-black-10'>예약 상세</span>
        <StateChip label={reservationStatus} />
      </div>
      <div className='border-black-5 mt-[1.2rem] rounded-[0.6rem] border-[0.07rem] px-[1.7rem] py-[1.3rem]'>
        <div className='caption-10-md text-black-7 mb-[2.4rem]'>예약 정보</div>
        <div className='flex flex-col gap-[2rem]'>
          <DetailRow label='날짜 및 시간' value={formatDate(date, startTime)} />
          <DetailRow label='촬영 시간' value={formatDuration(durationTime)} />
          <DetailRow label='장소' value={place} />
          <DetailRow label='인원' value={`${peopleCount}인`} />
          <DetailRow label='요청 사항' value={requestNote} />
        </div>
      </div>
    </section>
  );
}
