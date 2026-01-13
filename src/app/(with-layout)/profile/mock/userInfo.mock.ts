export const userInfoMock = {
  success: true,
  status: 200,
  message: '성공적으로 유저 정보를 조회했습니다.',
  code: 'USER_200_001',
  data: {
    id: 1,
    role: 'CLIENT',
    profileImageUrl:
      'http://img1.kakaocdn.net/thumb/R640x640.q70/?fname=http://t1.kakaocdn.net/account_images/default_profile.jpeg',
    hasPhotographerProfile: true,
    clientInfo: {
      name: '김소연',
      curatedMoods: ['내추럴', '따스한', '청량한'],
    },
    photographerInfo: null,
  },
};
