import { USER_TYPE, UserType } from '@/auth/constant/userType';
import {
  IconHome,
  IconExplore,
  IconReservation,
  IconProfile,
  IconHeart,
  IconMessage,
  IconProduct,
  IconHomeFill,
  IconHeartFill,
  IconExploreFill,
  IconReservationFill,
  IconProductFill,
  IconProfileFill,
  IconMessageFill,
} from '@/assets';
export type MenuItem = {
  href: string | null;
  activeIcon: React.ReactNode;
  inactiveIcon: React.ReactNode;
  label: string;
};

const USER_MENU: MenuItem[] = [
  { href: '/', activeIcon: <IconHomeFill />, inactiveIcon: <IconHome />, label: '홈' },
  { href: '/like', activeIcon: <IconHeartFill />, inactiveIcon: <IconHeart />, label: '좋아요' },
  {
    href: '/explore',
    activeIcon: <IconExploreFill />,
    inactiveIcon: <IconExplore />,
    label: '탐색',
  },
  {
    href: '/reservations',
    activeIcon: <IconReservationFill />,
    inactiveIcon: <IconReservation />,
    label: '예약',
  },
  {
    href: '/profile',
    activeIcon: <IconProfileFill />,
    inactiveIcon: <IconProfile />,
    label: '프로필',
  },
];

const PHOTOGRAPHER_MENU: MenuItem[] = [
  { href: '/', activeIcon: <IconHomeFill />, inactiveIcon: <IconHome />, label: '홈' },
  {
    href: null,
    activeIcon: <IconProductFill />,
    inactiveIcon: <IconProduct />,
    label: '상품 관리',
  },
  {
    href: '/photographers/reservations',
    activeIcon: <IconReservationFill />,
    inactiveIcon: <IconReservation />,
    label: '예약 관리',
  },
  { href: null, activeIcon: <IconMessageFill />, inactiveIcon: <IconMessage />, label: '메시지함' },
  {
    href: '/photographers/profile',
    activeIcon: <IconProfileFill />,
    inactiveIcon: <IconProfile />,
    label: '프로필',
  },
];

export const getMenuItems = (isLogIn: boolean, role: UserType) => {
  if (isLogIn && role === USER_TYPE.PHOTOGRAPHER) return PHOTOGRAPHER_MENU;
  return USER_MENU;
};
