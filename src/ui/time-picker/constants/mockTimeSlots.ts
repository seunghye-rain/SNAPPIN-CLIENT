import type { TimeSlotSection } from '../TimePicker';

//TODO: api 연동 후 삭제

export const MOCK_TIME_SLOTS: TimeSlotSection[] = [
  {
    label: '오전',
    slots: [
      { time: '06:00', state: 'disabled' },
      { time: '06:30', state: 'disabled' },
      { time: '07:00', state: 'default' },
      { time: '07:30', state: 'default' },
      { time: '08:00', state: 'disabled' },
      { time: '08:30', state: 'default' },
      { time: '09:00', state: 'default' },
      { time: '09:30', state: 'default' },
      { time: '10:00', state: 'default' },
      { time: '10:30', state: 'default' },
      { time: '11:00', state: 'default' },
      { time: '11:30', state: 'default' },
    ],
  },
  {
    label: '오후',
    slots: [
      { time: '12:00', state: 'default' },
      { time: '12:30', state: 'default' },
      { time: '13:00', state: 'default' },
      { time: '13:30', state: 'disabled' },
      { time: '14:00', state: 'default' },
      { time: '14:30', state: 'default' },
      { time: '15:00', state: 'default' },
      { time: '15:30', state: 'default' },
      { time: '16:00', state: 'default' },
      { time: '16:30', state: 'default' },
      { time: '17:00', state: 'disabled' },
      { time: '17:30', state: 'default' },
    ],
  },
];
