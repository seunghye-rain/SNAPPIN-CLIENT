import { USER_TYPE, UserType } from '@/auth/constant/userType';

export type MenuItem = {
  href: string | null;
  iconKey: string;
  label: string;
};

const USER_MENU: MenuItem[] = [
  { href: '/', iconKey: 'home', label: '홈' },
  { href: '/like', iconKey: 'like', label: '좋아요' },
  { href: '/explore', iconKey: 'explore', label: '탐색' },
  { href: '/reservations', iconKey: 'reservation', label: '예약' },
  { href: '/profile', iconKey: 'profile', label: '프로필' },
];

const PHOTOGRAPHER_MENU: MenuItem[] = [
  { href: '/', iconKey: 'home', label: '홈' },
  { href: null, iconKey: 'product', label: '상품 관리' },
  { href: '/photographers/reservations', iconKey: 'reservation', label: '예약 관리' },
  { href: null, iconKey: 'message', label: '메시지함' },
  { href: '/photographers/profile', iconKey: 'profile', label: '프로필' },
];

export const getMenuItems = (role: UserType) => {
  if (role === USER_TYPE.PHOTOGRAPHER) return PHOTOGRAPHER_MENU;
  return USER_MENU;
};
