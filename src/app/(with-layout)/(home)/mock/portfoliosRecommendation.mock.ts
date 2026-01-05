//로그인 시
export const portfoliosRecommendationMock = {
  userName: '사용자 이름',
  moods: ['자연스러운', '따뜻한', '차분한'],
  portfolios: [
    {
      portfolioId: 1,
      imageUrl: 'https://example.com/portfolio1.jpg',
      photographerName: '작가명',
    },
    {
      portfolioId: 2,
      imageUrl: 'https://example.com/portfolio1.jpg',
      photographerName: '작가명',
    },
    {
      portfolioId: 3,
      imageUrl: 'https://example.com/portfolio1.jpg',
      photographerName: '작가명',
    },
    {
      portfolioId: 4,
      imageUrl: 'https://example.com/portfolio1.jpg',
      photographerName: '작가명',
    },
    {
      portfolioId: 5,
      imageUrl: 'https://example.com/portfolio1.jpg',
      photographerName: '작가명',
    },
  ],
};

//비로그인 시
export const portfoliosPopularMock = {
  moods: ['자연스러운', '따뜻한', '차분한'],
  portfolios: [
    {
      id: 1,
      imageUrl: 'https://example.com/portfolio1.jpg',
      photographerName: '작가명',
      moods: ['따뜻한', '빈티지'],
    },
    {
      id: 2,
      imageUrl: 'https://example.com/portfolio1.jpg',
      photographerName: '작가명',
      moods: ['따뜻한', '빈티지'],
    },
    {
      id: 3,
      imageUrl: 'https://example.com/portfolio1.jpg',
      photographerName: '작가명',
      moods: ['따뜻한', '빈티지'],
    },
  ],
};
