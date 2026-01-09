export type ReservationDraft = {
  date: string | null;
  time: string | null;
  participantCount: number;
  durationHours: number;
  place: string;
  request: string;
};

export type ReservationConstraints = {
  minDurationHours: number;
  maxDurationHours?: number;
  minParticipantCount?: number;
  maxParticipantCount: number;
};
