import { ProfileItemSize } from '../types/variant';

export const PROFILE_ITEM_BASE = 'flex w-full items-center text-left';

export const PROFILE_ITEM_SIZE_THEME: Record<
  ProfileItemSize,
  {
    avatar: string;
  }
> = {
  sm: {
    avatar: 'h-[6.4rem] w-[6.4rem]',
  },
  md: {
    avatar: 'h-[8.7rem] w-[8.7rem]',
  },
};
