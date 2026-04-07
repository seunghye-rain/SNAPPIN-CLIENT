import { apiRequest } from '@/api/apiRequest';
import { QueryKey, useMutation, useQueryClient } from '@tanstack/react-query';
import { UpdateWishProductData, WishProductResponse } from '@/swagger-api';

type WishProductContext<TData> = {
  previousData?: TData;
};

type UseWishProductOptions<TData> = {
  // 좋아요 토글 시 낙관적 업데이트를 적용할 쿼리 키
  optimisticQueryKey?: QueryKey;
  // 좋아요 토글 후 무효화할 쿼리 키 목록
  invalidateQueryKeys?: QueryKey[];
  updater?: (oldData: TData | undefined, productId: number) => TData | undefined;
};

export const useWishProduct = <TData>({
  optimisticQueryKey,
  invalidateQueryKeys = [],
  updater,
}: UseWishProductOptions<TData> = {}) => {
  const queryClient = useQueryClient();

  return useMutation<WishProductResponse, Error, number, WishProductContext<TData>>({
    mutationFn: async (productId: number) => {
      const res = await apiRequest<UpdateWishProductData>({
        endPoint: '/api/v1/wishes/products',
        method: 'POST',
        data: { productId },
      });

      if (!res.data) {
        throw new Error('/api/v1/wishes/products 응답에 데이터가 존재하지 않습니다.');
      }

      return res.data;
    },

    onMutate: async (productId) => {
      if (!optimisticQueryKey || !updater) return {};

      await queryClient.cancelQueries({ queryKey: optimisticQueryKey });

      const previousData = queryClient.getQueryData<TData>(optimisticQueryKey);

      queryClient.setQueryData<TData>(optimisticQueryKey, (old) => updater(old, productId));

      return { previousData };
    },

    onError: (_error, _productId, context) => {
      if (!optimisticQueryKey) return;
      if (context?.previousData === undefined) return;

      queryClient.setQueryData(optimisticQueryKey, context.previousData);
    },

    onSettled: async () => {
      await Promise.all(
        invalidateQueryKeys.map((queryKey) => queryClient.invalidateQueries({ queryKey })),
      );
    },
  });
};
