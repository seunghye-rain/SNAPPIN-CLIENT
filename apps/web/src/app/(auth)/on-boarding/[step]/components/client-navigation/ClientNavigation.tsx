'use client';

import { useRouter } from 'next/navigation';
import { IconArrowBack } from '@snappin/design-system/assets';
import { Navigation } from '@snappin/design-system';

export default function ClientNavigation() {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return <Navigation isFixed={true} left={<IconArrowBack onClick={handleBackClick} />} />;
}
