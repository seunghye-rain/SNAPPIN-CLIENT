export const createDurationLabel = (durationHours: number) => {
  return `${Number.isInteger(durationHours) ? durationHours : durationHours.toFixed(1)}시간`;
};

export const createScheduleDateLabel = (scheduleDate: string) => {
  return scheduleDate.length > 0 ? `${scheduleDate.replaceAll('-', '.')}.` : '날짜 선택';
};

export const createScheduleTimeLabel = (scheduleTime: string) => {
  const [hourValueString = '0', minuteValueString = '00'] = scheduleTime.split(':');
  const hourValue = Number(hourValueString);
  const isMorning = hourValue < 12;
  const hourValueForDisplay = hourValue % 12 === 0 ? 12 : hourValue % 12;

  return scheduleTime.length > 0
    ? `${isMorning ? '오전' : '오후'} ${String(hourValueForDisplay).padStart(2, '0')}:${minuteValueString}`
    : '시간 선택';
};
