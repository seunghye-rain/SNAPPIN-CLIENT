export const USER_QUERY_KEY = {
  PORTFOLIO: ['portfolio'],
  PORTFOLIO_DETAIL: (id: number, isLogIn: boolean) => [...USER_QUERY_KEY.PORTFOLIO, id, isLogIn ? 'auth' : 'guest'],
} as const;