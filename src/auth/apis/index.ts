import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/api/apiRequest';
import { SERVER_API_BASE_URL } from '@/api/constants/api';
import { AUTH_QUERY_KEY } from '@/query-key/auth';
import {
  GetUserInfoResponse,
  GetUserInfoData,
} from '@/swagger-api/data-contracts';
import { useAuth } from '../hooks/useAuth';

export const getRefreshToken = async () => {
  const refreshResponse = await fetch(`${SERVER_API_BASE_URL}/api/v1/auth/reissue`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  });
  return refreshResponse;
};

// 유저 정보 조회 API
export const useGetUserInfo = () => {
  const { isLogIn } = useAuth();

  return useQuery<GetUserInfoResponse>({
    queryKey: AUTH_QUERY_KEY.AUTH,
    queryFn: async () => {
      const res = await apiRequest<GetUserInfoData>({
        endPoint: '/api/v1/users/me',
        method: 'GET',
      });

      if (!res.data) {
        throw new Error('/api/v1/users/me 응답에 데이터가 존재하지 않습니다.');
      }
      return res.data;
    },
    enabled: !!isLogIn,
  });
}