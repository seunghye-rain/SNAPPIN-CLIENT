import { z } from 'zod';
import {
  PRIMARY_SCHEDULE_CHOICE_KEY,
  REQUEST_CONTENT_ERROR_MESSAGE,
  REQUEST_CONTENT_MAX_LENGTH,
  SCHEDULE_CHOICE_KEYS,
  checkHasCompletedSchedule,
  type ScheduleChoiceKey,
} from './reservationCopyFormShared';

type CreateReservationCopyFormSchemaProps = {
  minimumDurationHours: number;
  maximumDurationHours: number;
  minPeople: number;
  maxPeople: number;
};

const createReservationCopyFormSchema = ({
  minimumDurationHours,
  maximumDurationHours,
  minPeople,
  maxPeople,
}: CreateReservationCopyFormSchemaProps) => {
  const scheduleSelectionSchema = z
    .object({
      date: z.string(),
      time: z.string(),
    })
    .superRefine((scheduleSelectionValue, context) => {
      const hasAnySelectedScheduleValue =
        scheduleSelectionValue.date.length > 0 || scheduleSelectionValue.time.length > 0;
      const hasCompletedSchedule = checkHasCompletedSchedule(scheduleSelectionValue);

      if (hasAnySelectedScheduleValue && !hasCompletedSchedule) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          message: '날짜와 시간을 함께 선택해 주세요.',
        });
      }
    });

  const scheduleSelectionSchemaShape = Object.fromEntries(
    SCHEDULE_CHOICE_KEYS.map((scheduleChoiceKey) => {
      return [scheduleChoiceKey, scheduleSelectionSchema];
    }),
  ) as Record<ScheduleChoiceKey, typeof scheduleSelectionSchema>;

  return z
    .object({
      placeId: z.string().min(1, '촬영 장소를 선택해 주세요.'),
      placeKeyword: z.string().min(1, '촬영 장소를 입력해 주세요.'),
      durationHours: z.number().min(minimumDurationHours).max(maximumDurationHours),
      peopleCount: z.number().min(minPeople).max(maxPeople),
      schedules: z.object(scheduleSelectionSchemaShape),
      uploadConsentStatus: z.union([z.literal('agree'), z.literal('disagree'), z.literal('')]),
      requestContent: z.string().max(REQUEST_CONTENT_MAX_LENGTH, REQUEST_CONTENT_ERROR_MESSAGE),
    })
    .superRefine((reservationCopyFormValue, context) => {
      const hasSelectedUploadConsent = reservationCopyFormValue.uploadConsentStatus.length > 0;
      const hasAnySelectedSchedule = SCHEDULE_CHOICE_KEYS.some((scheduleChoiceKey) => {
        return checkHasCompletedSchedule(reservationCopyFormValue.schedules[scheduleChoiceKey]);
      });

      if (!hasSelectedUploadConsent) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['uploadConsentStatus'],
          message: '업로드 동의 여부를 선택해 주세요.',
        });
      }

      if (!hasAnySelectedSchedule) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['schedules', PRIMARY_SCHEDULE_CHOICE_KEY, 'date'],
          message: '1~3지망 중 최소 1개 일정을 선택해 주세요.',
        });
      }
    });
};

export default createReservationCopyFormSchema;
