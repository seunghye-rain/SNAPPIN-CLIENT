import { useMutation, useQuery } from "@tanstack/react-query";
import { PHOTOGRAPHER_QUERY_KEY } from "@/query-key/photographer";
import { apiRequest } from "@/api/apiRequest";
import { ApiResponseBodyPayReservationResponseVoid, ApiResponseBodyRequestPaymentReservationResponseVoid, GetProductDetailData, GetProductDetailResponse, GetProductPriceData, Payment, PayReservationResponse, ProductPriceResponse, RequestPaymentReservationResponse } from "@/swagger-api/data-contracts";

export const useGetProductDetail = (productId: number) => {
  return useQuery<GetProductDetailResponse>({
    queryKey: PHOTOGRAPHER_QUERY_KEY.RESERVATION_DETAIL(productId),
    enabled: !!productId,
    queryFn: async () => {
      const res = await apiRequest<GetProductDetailData>({
        endPoint: `/api/v1/products/${productId}/price`,
        method: "GET",
      });

      if (!res.success) {
        throw new Error(
          `Failed to fetch /api/v1/products/${productId}/price`
        );
      }

      return res.data ?? {};
    },
  });
};


export const useRequestPayment = (reservationId: number) => {
  return useMutation({
    mutationFn: async (payment) => {
      console.info('payment', payment);
      const res =
        await apiRequest({
          endPoint: `/api/v1/reservations/${reservationId}/request-payment`, // ✅ 그대로
          method: "PATCH",
          data: JSON.stringify(payment), 
        });

      if (!res) {
        throw new Error(
          `Failed to fetch /api/v1/reservations/${reservationId}/request-payment`
        );
      }

      return res;
    },
  });
};