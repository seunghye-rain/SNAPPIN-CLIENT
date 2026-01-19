export const USER_QUERY_KEY = {
  WISH: ['wish'],
  WISHED_PORTFOLIOS: () => [...USER_QUERY_KEY.WISH, 'portfolios'],
  WISHED_PRODUCTS: () => [...USER_QUERY_KEY.WISH, 'products'],
} as const;
