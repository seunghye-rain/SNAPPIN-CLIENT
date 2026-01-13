'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useKakaoLoginMutation } from '../api';
import { CreateKakaoLoginData } from '@/swagger-api/data-contracts';

export default function KakaoCallbackPage() {
  const router = useRouter();
  const params = useSearchParams();
  const code = params.get('code');
  const error = params.get('error');

  const { mutate, isPending } = useKakaoLoginMutation()!;

  useEffect(() => {
    if (error) {
      console.error('error', error);
      router.replace('/login?error=kakao');
      return;
    }
    if (!code) return;

    mutate(
      { code },
      {
        onSuccess: (data: CreateKakaoLoginData) => {
          console.log(data);
        },
        onError: () => {
          router.replace('/login?error=kakao');
        },
      },
    );
  }, [code, error, mutate, router]);

  return <h1>{isPending ? '로그인 중입니다…' : '처리 중…'}</h1>;
}
