'use client';

import ReservationList from './_section/ReservationList';
import { ClientNavigation } from './components';

export default function PageClient() {
  return (
    <div className='bg-black-3 flex min-h-full flex-col'>
      <ClientNavigation />
      <ReservationList />
    </div>
  );
}
