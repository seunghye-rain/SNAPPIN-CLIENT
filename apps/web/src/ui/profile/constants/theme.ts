import { ProfileSize } from '../types/variant';

export const PROFILE_BASE = 'flex w-full items-center text-left';

export const PROFILE_SIZE_THEME: Record<
  ProfileSize,
  {
    avatar: number;
  }
> = {
  sm: {
    avatar: 64,
  },
  md: {
    avatar: 87,
  },
};
