'use server';

import { cookies } from 'next/headers';
import { AuthUser, UserType } from './constant/userType';
import { HAS_PHOTOGRAPHER_PROFILE_COOKIE_NAME, USER_TYPE_COOKIE_NAME } from './constant/cookie';

async function setAuthUser(value: AuthUser) {
  await Promise.all([
    setUserType(value.role),
    setHasPhotographerProfile(value.hasPhotographerProfile),
  ]);
}

async function deleteAuthUser() {
  await Promise.all([deleteUserType(), deleteHasPhotographerProfile()]);
}

async function setUserType(value: UserType) {
  const cookieStore = await cookies();
  cookieStore.set(USER_TYPE_COOKIE_NAME, value);
}

async function getUserType() {
  const cookieStore = await cookies();
  return cookieStore.get(USER_TYPE_COOKIE_NAME)?.value;
}

async function deleteUserType() {
  const cookieStore = await cookies();
  cookieStore.delete(USER_TYPE_COOKIE_NAME);
}

async function setHasPhotographerProfile(value: boolean) {
  const cookieStore = await cookies();
  cookieStore.set(HAS_PHOTOGRAPHER_PROFILE_COOKIE_NAME, value.toString());
}

async function getHasPhotographerProfile() {
  const cookieStore = await cookies();
  return cookieStore.get(HAS_PHOTOGRAPHER_PROFILE_COOKIE_NAME)?.value;
}

async function deleteHasPhotographerProfile() {
  const cookieStore = await cookies();
  cookieStore.delete(HAS_PHOTOGRAPHER_PROFILE_COOKIE_NAME);
}

export { setAuthUser, deleteAuthUser, getUserType, getHasPhotographerProfile };
