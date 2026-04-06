import { z } from 'zod';
import {
  MAXIMUM_DURATION_HOURS,
  MAXIMUM_PEOPLE_COUNT,
  MINIMUM_DURATION_HOURS,
  MINIMUM_PEOPLE_COUNT,
  PRIMARY_SCHEDULE_CHOICE_KEY,
  REQUEST_CONTENT_MAX_LENGTH,
  RESERVATION_COPY_FORM_ERROR_MESSAGE,
  SCHEDULE_CHOICE_KEYS,
  UPLOAD_CONSENT_STATUS_VALUES,
  hasCompletedSchedule,
  type ScheduleChoiceKey,
} from './reservationCopyFormShared';

// 각 일정 선택이 날짜와 시간 모두 선택되었는지 검증
const reservationScheduleSelectionSchema = z
  .object({
    date: z.string(),
    time: z.string(),
  })
  .superRefine((scheduleSelectionValue, context) => {
    const hasAnySelectedScheduleValue =
      scheduleSelectionValue.date.length > 0 || scheduleSelectionValue.time.length > 0;
    const hasCompletedScheduleSelection = hasCompletedSchedule(scheduleSelectionValue);

    if (!hasAnySelectedScheduleValue || hasCompletedScheduleSelection) {
      return;
    }

    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['date'],
      message: RESERVATION_COPY_FORM_ERROR_MESSAGE.SCHEDULE_PAIR_REQUIRED,
    });
  });

// 1~3지망 각각의 일정 선택
const reservationSchedulesSchemaShape = Object.fromEntries(
  SCHEDULE_CHOICE_KEYS.map((scheduleChoiceKey) => {
    return [scheduleChoiceKey, reservationScheduleSelectionSchema];
  }),
) as Record<ScheduleChoiceKey, typeof reservationScheduleSelectionSchema>;

// 1~3지망 중 하나라도 완료된 일정이 있는지 검증
const reservationSchedulesSchema = z
  .object(reservationSchedulesSchemaShape)
  .superRefine((scheduleSelections, context) => {
    const hasAnyCompletedSchedule = SCHEDULE_CHOICE_KEYS.some((scheduleChoiceKey) => {
      return hasCompletedSchedule(scheduleSelections[scheduleChoiceKey]);
    });

    if (hasAnyCompletedSchedule) {
      return;
    }

    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: [PRIMARY_SCHEDULE_CHOICE_KEY, 'date'],
      message: RESERVATION_COPY_FORM_ERROR_MESSAGE.SCHEDULE_REQUIRED,
    });
  });

const uploadConsentStatusSchema = z.enum(UPLOAD_CONSENT_STATUS_VALUES, {
  error: RESERVATION_COPY_FORM_ERROR_MESSAGE.UPLOAD_CONSENT_REQUIRED,
});

// 예약 폼 전체 스키마
const reservationCopyFormSchema = z.object({
  placeId: z.string().min(1, RESERVATION_COPY_FORM_ERROR_MESSAGE.PLACE_ID_REQUIRED),
  placeKeyword: z.string().min(1, RESERVATION_COPY_FORM_ERROR_MESSAGE.PLACE_KEYWORD_REQUIRED),
  durationHours: z.number().min(MINIMUM_DURATION_HOURS).max(MAXIMUM_DURATION_HOURS),
  peopleCount: z.number().min(MINIMUM_PEOPLE_COUNT).max(MAXIMUM_PEOPLE_COUNT),
  schedules: reservationSchedulesSchema,
  uploadConsentStatus: uploadConsentStatusSchema,
  requestContent: z
    .string()
    .max(REQUEST_CONTENT_MAX_LENGTH, RESERVATION_COPY_FORM_ERROR_MESSAGE.REQUEST_CONTENT_MAX),
});

export default reservationCopyFormSchema;
