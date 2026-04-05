import { formatShortDate } from '@/utils/formatDate';
import {
  SCHEDULE_CHOICES,
  checkHasCompletedSchedule,
  type ReservationApplicant,
  type ReservationCopyFormInput,
} from './reservationCopyFormShared';

type CreateReservationCopyTextProps = {
  applicant: ReservationApplicant;
  reservationCopyFormValue: ReservationCopyFormInput;
};

const createReservationCopyText = ({
  applicant,
  reservationCopyFormValue: {
    placeKeyword,
    durationHours,
    peopleCount,
    schedules,
    uploadConsentStatus,
    requestContent,
  },
}: CreateReservationCopyTextProps) => {
  const scheduleLines = SCHEDULE_CHOICES.filter(({ key }) => {
    return checkHasCompletedSchedule(schedules[key]);
  }).map(({ key, label }) => {
    const scheduleSelection = schedules[key];
    const formattedScheduleDate = formatShortDate(scheduleSelection.date).replaceAll('.', '/');

    return `• ${label}: ${formattedScheduleDate} ${scheduleSelection.time}`;
  });

  return [
    `1) 이름: ${applicant.name}`,
    `2) 전화번호: ${applicant.phoneNumber}`,
    `3) 이메일: ${applicant.email}`,
    `4) 촬영 장소: ${placeKeyword}`,
    `5) 촬영 시간: ${durationHours}시간`,
    `6) 촬영 인원: ${peopleCount}명`,
    `7) 촬영 일정`,
    ...scheduleLines,
    `8) 업로드 동의 여부: ${uploadConsentStatus === 'agree' ? '동의' : '비동의'}`,
    `9) 기타 요청 사항: ${requestContent || '-'}`,
  ].join('\n');
};

export default createReservationCopyText;
