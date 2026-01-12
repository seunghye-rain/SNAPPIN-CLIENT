'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useAiCuration } from '../hooks/useAiCuration';
import MoodAnimationResult from './components/mood-animation-result-state/MoodAnimationResult';
import MoodAnimationPending from './components/mood-animation-pending-state/MoodAnimationPending';
import { resultMock } from './mock/result.mock';

export default function Page() {
  const { selectedByStep } = useAiCuration();

  const [isPending, setIsPending] = useState(true);
  const [data, setData] = useState<typeof resultMock | null>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      setData(resultMock);
      setIsPending(false);
    }, 3000);

    return () => clearTimeout(t);
  }, [selectedByStep]);

  return (
    <div className='bg-neon-black h-dvh'>
      <AnimatePresence mode='wait'>
        {isPending ? (
          <MoodAnimationPending />
        ) : (
          <MoodAnimationResult data={data as typeof resultMock} />
        )}
      </AnimatePresence>
    </div>
  );
}
