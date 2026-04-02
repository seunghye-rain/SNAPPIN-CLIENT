'use client';

import { useParams, usePathname, useRouter } from 'next/navigation';
import { IconArrowBack } from '@snappin/design-system/assets';
import { Navigation } from '@snappin/design-system';
import { ROUTES } from '@/constants/routes/routes';

export default function ClientNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams<{ step?: string }>();

  const noShowBack = params.step === '1' || pathname === ROUTES.ON_BOARDING_FINAL;

  const handleBackClick = () => {
    router.back();
  };

  return (
    <Navigation
      isFixed={true}
      left={noShowBack ? undefined : <IconArrowBack onClick={handleBackClick} />}
    />
  );
}
