'use client';

import ReservationList from './_section/ReservationList';
import { ClientNavigation } from './components';
import useNavigationVisibility from './hooks/useNavigationVisibility';

export default function PageClient() {
  const { isVisible } = useNavigationVisibility();

  return (
    <div className='bg-black-3 flex min-h-full flex-col'>
      <ClientNavigation isVisible={isVisible} />
      <ReservationList isNavigationVisible={isVisible} />
    </div>
  );
}
