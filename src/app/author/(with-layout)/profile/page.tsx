'use client';

import { Divider } from '@/ui';
import { Category } from './_section';
import { Header, ProfileCard } from './components';
import { useAuth } from '@/auth/hooks/useAuth';
import { authorInfoMock } from './mock/authorInfo.mock';

export default function Page() {
  //const { isLogIn } = useAuth();
  const authorInfo = authorInfoMock.data;

  return (
    <div className='flex flex-col'>
      <Header />
      <ProfileCard
        profileImageUrl={authorInfo.profileImageUrl}
        name={authorInfo.photographerInfo.name}
        bio={authorInfo.photographerInfo.bio}
        specialties={authorInfo.photographerInfo.specialties}
        locations={authorInfo.photographerInfo.locations}
        isLoggedIn={true}
      />
      <Divider color='bg-black-3' className='h-[0.6rem]' />
      <Category isLoggedIn={true} />
    </div>
  );
}
