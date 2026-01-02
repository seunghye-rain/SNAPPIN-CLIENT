export type TimeSlot = {
  time: string;

  disabled: boolean;
};

export type TimeSlotSection = {
  label: string;

  slots: TimeSlot[];
};
