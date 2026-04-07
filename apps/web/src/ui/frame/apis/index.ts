// TODO: 상품 좋아요 API 추가
//TODO: 포폴 좋아요 API 추가
import { USER_QUERY_KEY } from '@/query-key/user';
import { GetProductDetailResponse } from '@/swagger-api';
import { useWishProduct } from '@/queries/product';

type UseWishProductDetailProps = {
  id: number;
  isLogin: boolean;
};

export const useWishProductDetail = ({ id, isLogin }: UseWishProductDetailProps) => {
  const detailQueryKey = USER_QUERY_KEY.PRODUCT_DETAIL(id, isLogin);

  return useWishProduct<GetProductDetailResponse>({
    optimisticQueryKey: detailQueryKey,
    invalidateQueryKeys: [detailQueryKey, USER_QUERY_KEY.WISHED_PRODUCTS()],
    updater: (old) => {
      if (!old) return old;

      return {
        ...old,
        isLiked: !old.isLiked,
      };
    },
  });
};
