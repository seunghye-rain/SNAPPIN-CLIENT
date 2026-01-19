export const USER_QUERY_KEY = {
  // AI 큐레이션
  AI_CURATION: ['ai-curation'],
  AI_CURATION_QUESTIONS:() => [...USER_QUERY_KEY.AI_CURATION, 'questions'],
  AI_CURATION_QUESTION_STEP: (step: number) => [...USER_QUERY_KEY.AI_CURATION_QUESTIONS(), step],
  AI_CURATION_RESULT: () => [...USER_QUERY_KEY.AI_CURATION, 'result'],

  // 추천 스냅 명소
  RECOMMENDATION: ['recommendation'],
  RECOMMENDATION_SNAP_PLACE: () => [...USER_QUERY_KEY.RECOMMENDATION, 'places'],

  // 추천 포트폴리오
  RECOMMENDATION_PORTFOLIOS: ['recommendation-portfolios'],
  RECOMMENDATION_PORTFOLIOS_PORTFOLIOS: () => [...USER_QUERY_KEY.RECOMMENDATION_PORTFOLIOS, 'portfolios'],
  RECOMMENDATION_PORTFOLIOS_PORTFOLIOS_LOGIN: (isLogin?: boolean) => [...USER_QUERY_KEY.RECOMMENDATION_PORTFOLIOS_PORTFOLIOS(), isLogin ? 'login' : 'not-login'],
  
  // 포트폴리오
  PORTFOLIO: ['portfolio'],
  PORTFOLIO_DETAIL: (id: number, isLogIn: boolean) => [...USER_QUERY_KEY.PORTFOLIO, id, isLogIn ? 'login' : 'not-login'],
  
  // TODO: 네이밍
  PRODUCT: ['product'],
  PRODUCT_DETAIL: (id: number) => [...USER_QUERY_KEY.PRODUCT, id],
  PRODUCT_PORTFOLIO_LIST: (id: number) => [...USER_QUERY_KEY.PRODUCT, id, 'portfolios'],
  PRODUCT_REVIEW_LIST: (id: number) => [...USER_QUERY_KEY.PRODUCT, id, 'reviews'],

  PHOTOGRAPHER: ['photographer'],
  PHOTOGRAPHER_DETAIL: (id: number) => [...USER_QUERY_KEY.PHOTOGRAPHER, id],
  PHOTOGRAPHER_PORTFOLIO_LIST: (id: number) => [...USER_QUERY_KEY.PHOTOGRAPHER, id, 'portfolios'],
  PHOTOGRAPHER_PRODUCT_LIST: (id: number) => [...USER_QUERY_KEY.PHOTOGRAPHER, id, 'products'],
} as const;
