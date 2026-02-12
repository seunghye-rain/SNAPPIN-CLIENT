'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/auth/hooks/useAuth';
import { type UserType } from '@/auth/constant/userType';
import { useToast } from '../toast/hooks/useToast';
import { getMenuItems } from './menu';

type FooterClientProps = {
  initialUserType: UserType | null;
};

export default function FooterClient({ initialUserType }: FooterClientProps) {
  const pathname = usePathname();
  const router = useRouter();

  const { isLogIn } = useAuth();
  const { error, removeToast } = useToast();

  const items = getMenuItems(Boolean(isLogIn), initialUserType);

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

const normalizePathForMenu = (path: string) => {
  if (path === '/photographers/profile' || path.startsWith('/photographers/profile/')) {
    return path.replace('/photographers/profile', '/profile');
  }
  return path;
};
