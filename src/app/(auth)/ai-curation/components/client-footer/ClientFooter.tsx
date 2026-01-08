'use client';

import { Button } from '@/ui';

export default function ClientFooter() {
  const handleStartCuration = () => {
    //TODO: AI 무드 큐레이션 시작하기
  };

  const handleGoHome = () => {
    //TODO: 홈으로 가기
  };

  return (
    <>
      <Button color='primary' size='large' onClick={handleStartCuration}>
        AI 무드 큐레이션 시작하기
      </Button>
      <Button color='primary' size='large' onClick={handleGoHome} className='bg-black-4'>
        홈으로 가기
      </Button>
    </>
  );
}
