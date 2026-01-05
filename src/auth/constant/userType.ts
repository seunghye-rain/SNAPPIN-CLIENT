export const USER_TYPE = {
  CLIENT: 'client',
  AUTHOR: 'author',
} as const;

export type UserType = (typeof USER_TYPE)[keyof typeof USER_TYPE];
