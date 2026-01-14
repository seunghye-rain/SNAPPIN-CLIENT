export const USER_TYPE = {
  CLIENT: 'CLIENT',
  PHOTOGRAPHER: 'PHOTOGRAPHER',
} as const;

export type UserType = (typeof USER_TYPE)[keyof typeof USER_TYPE];

export const USER_TYPES = Object.values(USER_TYPE) as UserType[];

export const USER_TYPE_LABEL: Record<UserType, string> = {
  [USER_TYPE.CLIENT]: '고객',
  [USER_TYPE.PHOTOGRAPHER]: '작가',
};
