'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { usePrefetchUserProfile, useGetUserInfo } from '@/auth/apis';
import { useAuth } from '@/auth/hooks/useAuth';
import { USER_TYPE, type UserType } from '@/auth/constant/userType';
import { useToast } from '../toast/hooks/useToast';
import { getMenuItems } from './menu';

type Props = {
  initialUserType: UserType | null;
};

export default function FooterClient({ initialUserType }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const prefetchUserProfile = usePrefetchUserProfile();
  const { isLogIn } = useAuth();
  const { error, removeToast } = useToast();
  const { data } = useGetUserInfo();

  // 서버에서 내려준 쿠키 값(초기) + userInfo(최신) 중 최신을 우선
  const userType = (data?.role as UserType | undefined) ?? initialUserType;

  useEffect(() => {
    if (!isLogIn) return;
    if (userType === USER_TYPE.PHOTOGRAPHER) {
      prefetchUserProfile();
    }
  }, [isLogIn, userType, prefetchUserProfile]);

  const items = getMenuItems(Boolean(isLogIn), (data?.role as UserType) ?? USER_TYPE.CLIENT);
  const normalizePathForMenu = (path: string) => {
    // 의미상 같은 메뉴로 취급할 경로만 여기서 정규화
    if (path === '/photographers/profile' || path.startsWith('/photographers/profile/')) {
      return path.replace('/photographers/profile', '/profile');
    }
    return path;
  };

  const isActive = (href: string | null) => {
    if (!href) return false;

    const normalized = normalizePathForMenu(pathname);

    if (href === '/') return normalized === '/';
    return normalized === href || normalized.startsWith(`${href}/`);
  };

  const handleClickMenuItem = (href: string | null) => {
    if (href === null) {
      error('준비 중입니다. 조금만 기다려주세요!', undefined, 'bottom-[8rem]');
      return;
    }

    removeToast();

    if (!isLogIn && href === '/profile') {
      router.push('/login');
      return;
    }

    router.push(href);
  };

  return (
    <div className='z-20'>
      <div className='bg-black-1 footer-height pointer-events-none' aria-hidden />
      <footer className='border-black-5 footer-height fixed-center bg-black-1 bottom-0 flex items-center justify-between border-t-[0.5px] px-[2rem] pt-[0.2rem] pb-[0.6rem]'>
        {items.map((item) => {
          const active = isActive(item.href);
          const Icon = active ? item.activeIcon : item.inactiveIcon;

          return (
            <button
              key={item.label}
              type='button'
              onClick={() => handleClickMenuItem(item.href)}
              className='flex h-[4.8rem] w-[4.8rem] flex-col items-center justify-center gap-[0.2rem]'
              aria-label={item.label}
            >
              {Icon}
              <span className='caption-10-md'>{item.label}</span>
            </button>
          );
        })}
      </footer>
    </div>
  );
}
