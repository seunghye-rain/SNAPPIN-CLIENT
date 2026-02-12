// src/ui/footer/Footer.server.tsx
import FooterClient from './Footer.client';
import { getUserType } from '@/auth/userType';
import type { UserType } from '@/auth/constant/userType';

export default async function Footer() {
  const userType = (await getUserType()) as UserType | undefined;
  return <FooterClient initialUserType={userType ?? null} />;
}
