import { Divider } from '@/ui';
import { ClientHeader, ClientProfileCard, Menus } from './components';
import { getHasPhotographerProfile } from '@/auth/userType';
import { redirect } from 'next/navigation';

export default async function Page() {
  const has = await getHasPhotographerProfile();

  if (has === 'true') {
    redirect('/photographers/profile');
  }
  return (
    <div className='flex flex-col'>
      <ClientHeader />
      <ClientProfileCard />
      <Divider color='bg-black-3' className='h-[0.6rem]' />
      <Menus />
    </div>
  );
}
