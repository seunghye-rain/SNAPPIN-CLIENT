import { UserType } from '@/auth/constant/userType';

export const USER_ROLES = ['CLIENT', 'PHOTOGRAPHER'] as const;

export type UserRole = (typeof USER_ROLES)[number];

export const hasUserRole = (value: string): value is UserRole =>
  USER_ROLES.some((userRole) => userRole === value);

// 받아온 UsrRole을 UserType으로 변환
export const getUserTypeByUserRole = (userRole: UserRole): UserType =>
  userRole === 'CLIENT' ? 'client' : 'author';

// UserType에 의해 UserRole로 변환
export const getUserRoleByUserType = (userType: UserType): UserRole =>
  userType === 'client' ? 'CLIENT' : 'PHOTOGRAPHER';
