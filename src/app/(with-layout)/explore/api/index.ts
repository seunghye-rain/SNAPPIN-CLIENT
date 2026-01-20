import { useSuspenseQuery } from '@tanstack/react-query';
import { ApiResponseBodyGetPlaceListResponseVoid } from '@/swagger-api/data-contracts';

const BASE_URL = process.env.NEXT_PUBLIC_API_SERVER_BASE_URL;
const ENDPOINT = '/api/v1/places';
const FULL_URL = `${BASE_URL}${ENDPOINT}`;

export const useSearchPlaces = (keyword: string | null) => {
  const trimmedKeyword = keyword.trim();

  return useSuspenseQuery({
    queryKey: ['searchPlaces', keyword],
    queryFn: async () => {
      const url = `${FULL_URL}?keyword=${encodeURIComponent(trimmedKeyword)}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`촬영 장소 조회 API 요청 실패 ${response.status} ${response.statusText}`);
      }

      const data = (await response.json()) as ApiResponseBodyGetPlaceListResponseVoid;

      if (!data.data) throw new Error(`촬영 장소 조회 API 에러 ${data.message}`);
      return data.data.places;
    },
  });
};
