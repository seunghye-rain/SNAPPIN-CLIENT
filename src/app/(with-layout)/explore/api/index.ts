import { useQuery } from '@tanstack/react-query';
import { GetPlaceResponse } from '@/swagger-api/data-contracts';

const BASE_URL = process.env.NEXT_PUBLIC_API_SERVER_BASE_URL;
const ENDPOINT = '/api/v1/places';
const FULL_URL = `${BASE_URL}${ENDPOINT}`;

export const useSearchPlaces = (keyword: string) => {
  const trimmedKeyword = keyword.trim();

  return useQuery<GetPlaceResponse[]>({
    queryKey: ['searchPlaces', keyword],
    queryFn: async ({ signal }) => {
      if (keyword === '') return [];
      const url = `${FULL_URL}?keyword=${encodeURIComponent(trimmedKeyword)}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal,
      });

      if (!response.ok) {
        throw new Error(`촬영 장소 조회 API 요청 실패 ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (!data.data) return [];
      return data.data.places;
    },
    staleTime: 30 * 1000, // 30 seconds
    retry: 0,
  });
};
