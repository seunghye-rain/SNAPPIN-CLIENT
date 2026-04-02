'use client';

import { useParams, usePathname, useRouter } from 'next/navigation';
import { IconArrowBack } from '@snappin/design-system/assets';
import { Navigation } from '@snappin/design-system';

export default function ClientNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams<{ step?: string }>();

  const noShowBack = params.step === '1' || pathname === '/on-boarding/final';

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
