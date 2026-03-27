'use client';

import { useNavVisibility } from '@/hooks/useNavVisibility';
import { ClientHeader } from './components';

export default function PageClient() {
  const { isVisible } = useNavVisibility();

  return (
    <div className='relative mb-[6rem] flex w-full flex-col'>
      <ClientHeader isVisible={isVisible} />
      <div>
        {/*  배너 영역 */}
        {/*  포폴 추천 영역 */}
        {/*  무드 큐레이션 영역 */}
      </div>
    </div>
  );
}
