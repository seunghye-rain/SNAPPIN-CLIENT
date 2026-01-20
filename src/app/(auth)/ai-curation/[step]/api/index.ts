'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/api/apiRequest';
import { USER_QUERY_KEY } from '@/query-key/user';
import { ApiResponseBodyGetAllCurationQuestionsResponseVoid, GetCurationQuestionPhotosResponse } from '@/swagger-api/data-contracts';

export const useGetAiCurationAll = () => {
  return useQuery<GetCurationQuestionPhotosResponse[]>({
    queryKey: USER_QUERY_KEY.AI_CURATION_ALL(),
    queryFn: async () => {
      const res = await apiRequest<ApiResponseBodyGetAllCurationQuestionsResponseVoid>({
        endPoint: '/api/v1/curation/all',
        method: 'GET',
      });

      if (!res.data?.questions) {
        throw new Error("Failed to get /api/v1/curation/all");
      }

      return res.data.questions;
    },
  });
};

export const useGetAiCurationAllPrefetch = () => {
    const queryClient = useQueryClient();
  
    return () => {
        console.log('prefetch called');
      queryClient.prefetchQuery({
        queryKey: USER_QUERY_KEY.AI_CURATION_ALL(),
        queryFn: useGetAiCurationAll,
      });
    }
  };