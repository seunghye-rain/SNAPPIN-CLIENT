import { SERVER_API_BASE_URL } from '@/api/constants/api';

export const getRefreshToken = async () => {
  return fetch(`${SERVER_API_BASE_URL}/api/v1/auth/reissue`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  });
};
