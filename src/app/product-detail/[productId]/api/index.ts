import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/auth/hooks/useAuth';
import { apiRequest } from '@/api/apiRequest';
import { SERVER_API_BASE_URL } from '@/api/constants/api';
import { USER_QUERY_KEY } from '@/query-key/user';
import {
  GetProductDetailResponse,
  GetProductDetailData,
} from '@/swagger-api/data-contracts';

const getProductDetail = async (
  id: number,
  isLogIn: boolean,
): Promise<GetProductDetailResponse> => {
  // 로그인 시 apiRequest 사용
  if (isLogIn) {
    const res = await apiRequest<GetProductDetailData>({
      endPoint: `/api/v1/products/${id}`,
      method: 'GET',
    });

    if (!res.data) throw new Error('/api/v1/products/{id} 응답에 데이터가 존재하지 않습니다.');
    return res.data;
  }

  // 비로그인 시 fetch 사용
  const res = await fetch(`${SERVER_API_BASE_URL}/api/v1/products/${id}`, { method: 'GET' });
  
  if (!res.ok) {
    throw new Error('상품 상세 정보 및 상품 안내 정보를 불러오는 데 실패했습니다.');
  }
  const data = await res.json();
  return data.data;
}

// 상품 상세 정보 및 상품 안내 조회 API
export const useGetProductDetail = (id: number) => {
  const { isLogIn } = useAuth();

  return useQuery<GetProductDetailResponse>({
    queryKey: USER_QUERY_KEY.PRODUCT_DETAIL(id, !!isLogIn),
    queryFn: () => getProductDetail(id, !!isLogIn),
    enabled: !Number.isNaN(id),
  })
}