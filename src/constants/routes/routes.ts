const toSegment = (value: number) => encodeURIComponent(String(value));

export const ROUTES = {
  HOME: '/',
  LOGIN: (params?: string) => `/login${params ? `?${params}` : ''}`,
  AI_CURATION: '/ai-curation',
  AI_CURATION_STEP: (step: number) => `/ai-curation/${toSegment(step)}`,
  AI_CURATION_RESULT: '/ai-curation/result',
  EXPLORE: (params?: string) => `/explore${params ? `?${params}` : ''}`,
  LIKE: '/like',
  PROFILE: '/profile',
  RESERVATIONS: '/reservations',
  PHOTO_FINAL: (id: number) => `/photo-final/${toSegment(id)}`,
  PHOTO_FINAL_PHOTOS_REVIEW: (id: number, reviewId: number) =>
    `/photo-final/${toSegment(id)}/photos/${toSegment(reviewId)}`,
  PHOTOGRAPHER: (id: number, params?: string) =>
    `/photographer/${toSegment(id)}${params ? `?${params}` : ''}`,
  PORTFOLIO: (id: number) => `/portfolio/${toSegment(id)}`,
  PRODUCT: (productId: number, params?: string) =>
    `/product/${toSegment(productId)}${params ? `?${params}` : ''}`,
  PRODUCT_REVIEW: (productId: number, reviewId: number) =>
    `/product/${toSegment(productId)}/review/${toSegment(reviewId)}`,
  RESERVATION: (id: number) => `/reservation/${toSegment(id)}`,
  REVIEW_FORM: (id: number) => `/review-form/${toSegment(id)}`,
} as const;

export const PHOTOGRAPHERS_ROUTES = {
  PROFILE: '/photographers/profile',
  RESERVATIONS: (params?: string) => `/photographers/reservations${params ? `?${params}` : ''}`,
  PAYMENT: (id: number) => `/photographers/payment/${toSegment(id)}`,
  PAYMENT_ADD_PAYMENT: (id: number) => `/photographers/payment/${toSegment(id)}/add-payment`,
  RESERVATION: (id: number) => `/photographers/reservation/${toSegment(id)}`,
  RESERVATION_PHOTOS_REVIEW: (id: number, reviewId: number) =>
    `/photographers/reservation/${toSegment(id)}/photos/${toSegment(reviewId)}`,
} as const;
