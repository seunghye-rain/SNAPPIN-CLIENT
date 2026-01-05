import { cookies } from 'next/headers';
import { UserType } from './constant/userType';

async function setUserType(value: UserType) {
  const cookieStore = await cookies();
  cookieStore.set('UserType', value);
}

async function getUserType() {
  const cookieStore = await cookies();
  return cookieStore.get('UserType')?.value;
}

async function deleteUserType() {
  const cookieStore = await cookies();
  cookieStore.delete('UserType');
}

async function updateUserType(value: UserType) {
  const cookieStore = await cookies();
  cookieStore.set('UserType', value);
}

export { setUserType, getUserType, deleteUserType, updateUserType };
