export const MINIMUM_DURATION_HOURS = 1;
export const MAXIMUM_DURATION_HOURS = 2;
export const DURATION_STEP_HOURS = 0.5;

export const MINIMUM_PEOPLE_COUNT = 1;
export const MAXIMUM_PEOPLE_COUNT = 15;
export const PEOPLE_COUNT_STEP = 1;

export const REQUEST_CONTENT_MAX_LENGTH = 500;

export const RESERVATION_COPY_FORM_ERROR_MESSAGE = {
  PLACE_ID_REQUIRED: '촬영 장소를 선택해 주세요.',
  PLACE_KEYWORD_REQUIRED: '촬영 장소를 입력해 주세요.',
  SCHEDULE_PAIR_REQUIRED: '날짜와 시간을 함께 선택해 주세요.',
  SCHEDULE_REQUIRED: '1~3지망 중 최소 1개 일정을 선택해 주세요.',
  UPLOAD_CONSENT_REQUIRED: '업로드 동의 여부를 선택해 주세요.',
  REQUEST_CONTENT_MAX: '최대 500자까지 입력할 수 있어요.',
} as const;

export const SCHEDULE_CHOICE_KEYS = ['firstChoice', 'secondChoice', 'thirdChoice'] as const;
export const PRIMARY_SCHEDULE_CHOICE_KEY = SCHEDULE_CHOICE_KEYS[0];
export const UPLOAD_CONSENT_STATUS_VALUES = ['agree', 'disagree'] as const;

export type ReservationApplicant = {
  name: string;
  phoneNumber: string;
  email: string;
};

export type ScheduleSelectionValue = {
  date: string;
  time: string;
};

export type ScheduleSelections = Record<
  (typeof SCHEDULE_CHOICE_KEYS)[number],
  ScheduleSelectionValue
>;

export type ReservationCopyFormInput = {
  placeId: string;
  placeKeyword: string;
  durationHours: number;
  peopleCount: number;
  schedules: ScheduleSelections;
  uploadConsentStatus: '' | (typeof UPLOAD_CONSENT_STATUS_VALUES)[number];
  requestContent: string;
};

// 1~3지망 정의
const SCHEDULE_CHOICE_LABELS: Record<(typeof SCHEDULE_CHOICE_KEYS)[number], string> = {
  firstChoice: '1지망',
  secondChoice: '2지망',
  thirdChoice: '3지망',
};

// 렌더링에 사용할 일정 선택 옵션 목록
export const SCHEDULE_CHOICES: ReadonlyArray<{
  key: (typeof SCHEDULE_CHOICE_KEYS)[number];
  label: string;
}> = SCHEDULE_CHOICE_KEYS.map((scheduleChoiceKey) => ({
  key: scheduleChoiceKey,
  label: SCHEDULE_CHOICE_LABELS[scheduleChoiceKey],
}));

// 날짜와 시간이 모두 선택 되었는지 검증
export const hasCompletedSchedule = (scheduleSelection: ScheduleSelectionValue) => {
  return scheduleSelection.date.length > 0 && scheduleSelection.time.length > 0;
};

// 2, 3지망은 이전 지망이 완료되어야 선택 가능
export const hasSelectableScheduleChoice = (
  scheduleChoiceKey: (typeof SCHEDULE_CHOICE_KEYS)[number],
  scheduleSelections: ScheduleSelections,
) => {
  const scheduleChoiceIndex = SCHEDULE_CHOICE_KEYS.findIndex((key) => {
    return key === scheduleChoiceKey;
  });

  if (scheduleChoiceIndex <= 0) {
    return true;
  }

  return SCHEDULE_CHOICE_KEYS.slice(0, scheduleChoiceIndex).every((previousScheduleChoiceKey) => {
    return hasCompletedSchedule(scheduleSelections[previousScheduleChoiceKey]);
  });
};

export const hasValidUploadConsentStatus = (uploadConsentStatus: string) => {
  return UPLOAD_CONSENT_STATUS_VALUES.some((uploadConsentStatusValue) => {
    return uploadConsentStatusValue === uploadConsentStatus;
  });
};

export const createInitialScheduleSelections = (): ScheduleSelections => {
  return Object.fromEntries(
    SCHEDULE_CHOICE_KEYS.map((scheduleChoiceKey) => {
      return [scheduleChoiceKey, { date: '', time: '' }];
    }),
  ) as ScheduleSelections;
};

export const createDefaultReservationCopyFormValue = (): ReservationCopyFormInput => {
  return {
    placeId: '',
    placeKeyword: '',
    durationHours: MINIMUM_DURATION_HOURS,
    peopleCount: MINIMUM_PEOPLE_COUNT,
    schedules: createInitialScheduleSelections(),
    uploadConsentStatus: '',
    requestContent: '',
  };
};
