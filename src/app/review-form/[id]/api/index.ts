import { useMutation, useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/api/apiRequest';
import {
  ApiResponseBodyPostPresignedUrlResponseVoid,
  PostPresignedUrlResponse,
  ReservationDetailResponse,
  GetReservationDetailData,
} from '@/swagger-api/data-contracts';
import { USER_QUERY_KEY } from '@/query-key/user';

export const useGetReservationDetail = (reservationId: number, isEnabled = true) => {
  const enabled = isEnabled && reservationId != null;

  return useQuery<ReservationDetailResponse>({
    queryKey: USER_QUERY_KEY.RESERVATION_DETAIL(reservationId),
    enabled,
    queryFn: async () => {
      const response = await apiRequest<GetReservationDetailData>({
        endPoint: `/api/v1/reservations/${reservationId}`,
        method: 'GET',
      });
      if (!response.data) throw new Error(`No data from /api/v1/reservations/${reservationId}`);
      return response.data;
    },
  });
};

export const useImageUpload = () => {
  return useMutation<PostPresignedUrlResponse, Error, { fileName: string; contentType: string }>({
    mutationFn: async ({ fileName, contentType }) => {
      const res = await apiRequest<ApiResponseBodyPostPresignedUrlResponseVoid>({
        endPoint: '/api/v1/reviews/images',
        method: 'POST',
        data: { fileName, contentType },
      });

      if (!res.data || !res.data.uploadUrl || !res.data.imageUrl) {
        throw new Error('No data from POST /api/v1/reviews/images');
      }

      return res.data;
    },
  });
};
