import FooterClient from './Footer.client';
import { getUserType } from '@/auth/userType';
import type { UserType } from '@/auth/constant/userType';

export default async function Footer() {
  const userType = await getUserType();

  return <FooterClient initialUserType={userType ? (userType as UserType) : null} />;
}
