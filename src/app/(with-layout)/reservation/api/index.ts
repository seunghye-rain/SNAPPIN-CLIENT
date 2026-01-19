import { ReservationListResponse } from '@/swagger-api/data-contracts';
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/api/apiRequest';
import { ApiResponseBodyReservationListResponseVoid } from '@/swagger-api/data-contracts';
import { USER_QUERY_KEY } from '@/query-key/user';
import { RESERVATION_TAB, type ReservationTab } from '../constants/tabs';

const RESERVATION_QUERY_KEY_BY_TAB: Record<ReservationTab, () => string[]> = {
  [RESERVATION_TAB.CLIENT_OVERVIEW]: USER_QUERY_KEY.RESERVATION_CLIENT_VIEW,
  [RESERVATION_TAB.CLIENT_DONE]: USER_QUERY_KEY.RESERVATION_CLIENT_DONE,
};

const useGetReservationList = (
  tab: ReservationTab = RESERVATION_TAB.CLIENT_OVERVIEW,
  isEnabled = true,
) => {
  return useQuery<ReservationListResponse>({
    queryKey: RESERVATION_QUERY_KEY_BY_TAB[tab](),
    queryFn: async () => {
      const response = await apiRequest<ApiResponseBodyReservationListResponseVoid>({
        endPoint: `/api/v1/reservations?tab=${tab}`,
        method: 'GET',
      });
      if (!response.data) throw new Error('No data from /api/v1/reservations');
      return response.data;
    },
    enabled: isEnabled,
  });
};

export default useGetReservationList;
