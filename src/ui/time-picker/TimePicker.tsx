import { useState } from 'react';
import { TimeButton } from './TimeButton';
import { TimeButtonState } from './constants/buttonState';
import { TimeSlotSection } from './types/timeSlot';

type TimePickerProps = {
  sections: TimeSlotSection[];
  value?: string | null;
  onChange?: (time: string) => void;
};

export function TimePicker({ sections, value, onChange }: TimePickerProps) {
  const [internalTime, setInternalTime] = useState<string | null>(null);
  const selectedTime = value ?? internalTime;

  const handleSelect = (time: string) => {
    setInternalTime(time);
    onChange?.(time);
  };

  const getState = (time: string, disabled: boolean): TimeButtonState => {
    if (disabled) return 'disabled';
    if (selectedTime === time) return 'clicked';
    return 'default';
  };

  return (
    <div className='bg-white p-5'>
      {sections.map((section) => (
        <section key={section.label} className='mb-6 last:mb-2'>
          <p className='caption-12-md text-black-8 mb-1'>{section.label}</p>

          <div className='grid grid-cols-[repeat(4,7.4rem)] gap-2'>
            {section.slots.map(({ time, disabled }) => (
              <TimeButton
                key={time}
                time={time}
                state={getState(time, disabled)}
                onClick={handleSelect}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
