import 'server-only';

import { QueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/api/apiRequest.server';
import { SERVER_API_BASE_URL } from '@/api/constants/api';
import { GetPortfolioListData, GetProductListData } from '@/swagger-api';
import { PORTFOLIO_QUERY_KEY, PRODUCT_QUERY_KEY } from '@/query-key/user';
import {
  photographerDetailOptions,
} from './options';

const getPhotographerPortfoliosServer = async (
  id: number,
  isLogIn: boolean,
  cursor?: string,
) => {
  if (isLogIn) {
    const params: Record<string, string> = { photographerId: String(id) };

    if (cursor) {
      params.cursor = cursor;
    }

    const res = await apiRequest<GetPortfolioListData>({
      endPoint: '/api/v2/portfolios',
      method: 'GET',
      params,
    });

    if (!res.data) {
      throw new Error('/api/v2/portfolios 응답에 데이터가 존재하지 않습니다.');
    }

    return res;
  }

  const url = new URL(`${SERVER_API_BASE_URL}/api/v2/portfolios`);
  url.searchParams.append('photographerId', String(id));

  if (cursor) {
    url.searchParams.append('cursor', cursor);
  }

  const res = await fetch(url.toString(), { method: 'GET' });

  if (!res.ok) {
    throw new Error('포트폴리오 목록 정보를 불러오는 데 실패했습니다.');
  }

  return await res.json();
};

const getPhotographerProductsServer = async (
  id: number,
  isLogIn: boolean,
  cursor?: string,
) => {
  if (isLogIn) {
    const params: Record<string, string> = { photographerId: String(id) };

    if (cursor) {
      params.cursor = cursor;
    }

    const res = await apiRequest<GetProductListData>({
      endPoint: '/api/v2/products',
      method: 'GET',
      params,
    });

    if (!res.data) {
      throw new Error('/api/v2/products 응답에 데이터가 존재하지 않습니다.');
    }

    return res;
  }

  const url = new URL(`${SERVER_API_BASE_URL}/api/v2/products`);
  url.searchParams.append('photographerId', String(id));

  if (cursor) {
    url.searchParams.append('cursor', cursor);
  }

  const res = await fetch(url.toString(), { method: 'GET' });

  if (!res.ok) {
    throw new Error('상품 목록 정보를 불러오는 데 실패했습니다.');
  }

  return await res.json();
};

// 작가 상세 조회 prefetch
export const prefetchPhotographerDetail = (queryClient: QueryClient, id: number) => {
  return queryClient.prefetchQuery(photographerDetailOptions(id));
}

// 포폴 목록 조회 prefetch
export const prefetchPortfolioList = (
  queryClient: QueryClient,
  id: number,
  isLogIn: boolean
) => {
  return queryClient.prefetchInfiniteQuery({
    queryKey: PORTFOLIO_QUERY_KEY.PHOTOGRAPHER_LIST(id, isLogIn),
    initialPageParam: undefined as string | undefined,
    queryFn: ({ pageParam }) => {
      const cursor = typeof pageParam === 'string' ? pageParam : undefined;
      return getPhotographerPortfoliosServer(id, isLogIn, cursor);
    },
    getNextPageParam: (lastPage) =>
      (lastPage.meta?.hasNext ? lastPage.meta.nextCursor : undefined),
    pages: 1,
  });
}

// 상품 목록 조회 prefetch
export const prefetchProductList = (
  queryClient: QueryClient,
  id: number,
  isLogIn: boolean
) => {
  return queryClient.prefetchInfiniteQuery({
    queryKey: PRODUCT_QUERY_KEY.PHOTOGRAPHER_LIST(id, isLogIn),
    initialPageParam: undefined as string | undefined,
    queryFn: ({ pageParam }) => {
      const cursor = typeof pageParam === 'string' ? pageParam : undefined;
      return getPhotographerProductsServer(id, isLogIn, cursor);
    },
    getNextPageParam: (lastPage) =>
      (lastPage.meta?.hasNext ? lastPage.meta.nextCursor : undefined),
    pages: 1,
  });
}
