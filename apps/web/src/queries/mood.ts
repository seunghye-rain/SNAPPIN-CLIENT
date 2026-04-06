import { useQuery } from '@tanstack/react-query';
import { SERVER_API_BASE_URL } from '@/api/constants/api';
import { GetMoodFilterResponse } from '@/swagger-api';

export const useGetMoodIdList = () => {
  //토큰 불필요 api 이므로 fetch 사용
  return useQuery<GetMoodFilterResponse[]>({
    queryKey: ['moods'],
    queryFn: () =>
      fetch(`${SERVER_API_BASE_URL}/api/v2/moods`, {
        method: 'GET',
      })
        .then((res) => res.json())
        .then((data) => {
          return data.data.moods;
        }),
  });
};
