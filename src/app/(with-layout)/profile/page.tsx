import { redirect } from 'next/navigation';
import { getHasPhotographerProfile } from '@/auth/userType';
import { USER_TYPE } from '@/auth/constant/userType';
import ProfileLayout from '@/components/layout/profile/ProfileLayout';

export default async function Page() {
  const hasPhotographerProfile = await getHasPhotographerProfile();

  if (hasPhotographerProfile) {
    redirect('/photographers/profile');
  }
  return <ProfileLayout userType={USER_TYPE.CLIENT} />;
}
