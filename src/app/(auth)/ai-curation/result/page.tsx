'use client';

import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import { AnimatePresence, motion } from 'framer-motion';

import CurationLoading from '@/assets/lotties/curationLoading.json';
import { useAiCuration } from '../hooks/useAiCuration';
import { resultMock } from './mock/result.mock';

export default function Page() {
  const { selectedImageIds } = useAiCuration();

  const [isPending, setIsPending] = useState(true);
  const [data, setData] = useState<typeof resultMock | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setIsPending(false);
      setData(resultMock);
    }, 3000);
  }, []);

  return (
    <div className='bg-neon-black flex h-dvh flex-col items-center justify-center'>
      {/* 로티 영역: 응답 오면 위로 올라가며 사라짐 */}
      <AnimatePresence mode='popLayout'>
        {isPending && (
          <motion.div
            key='lottie'
            layout
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{
              opacity: 0,
              y: -40,
              height: 0,
              marginTop: 0,
              transition: { duration: 0.35, ease: 'easeInOut' },
            }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className='w-full'
          >
            <Lottie animationData={CurationLoading} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 텍스트/결과 영역: layout으로 자연스럽게 자리 이동 */}
      <motion.div layout className='mt-[3rem] flex flex-col items-center gap-[0.3rem]'>
        <span className='caption-12-md text-black-7'>두구두구</span>
        <h1 className='title-23-eb text-black-10'>무드 큐레이션 결과는...</h1>

        {/* ✅ 응답 후 보여줄 결과 (예시) */}
        {!isPending && data && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className='mt-[1.6rem] flex flex-col items-center gap-[0.6rem]'
          ></motion.div>
        )}
      </motion.div>
    </div>
  );
}
