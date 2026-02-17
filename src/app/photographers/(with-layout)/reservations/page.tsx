import dynamic from 'next/dynamic';
import { NavigationClient } from './components';

const ReservationContent = dynamic(
  () =>
    import('@/app/photographers/(with-layout)/reservations/components/reservation-content/ReservationContent'),
);

export default function Page() {
  return (
    <div className='flex flex-col'>
      <NavigationClient />
      <ReservationContent />
    </div>
  );
}
