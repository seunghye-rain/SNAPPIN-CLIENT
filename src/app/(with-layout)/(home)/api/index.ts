import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/api/apiRequest';
import {
  ApiResponseBodyGetPlacePhotographerRecommendationResponseVoid,
  type GetPlacePhotographerRecommendationResponse,
} from '@/swagger-api/data-contracts';
import { USER_QUERY_KEY } from '@/query-key/user';

const useGetRecommendation = () => {
  return useQuery<GetPlacePhotographerRecommendationResponse>({
    queryKey: USER_QUERY_KEY.RECOMMENDATION_SNAP_PLACE(),
    queryFn: async () => {
      const response =
        await apiRequest<ApiResponseBodyGetPlacePhotographerRecommendationResponseVoid>({
          endPoint: '/api/v1/home/recommendation',
          method: 'GET',
        });
      if (!response.data) throw new Error('No data from /api/v1/home/recommendation');
      return response.data;
    },
  });
};

export default useGetRecommendation;
