'use client';

import { useState } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';

import MoodChip from '../mood-chip/MoodChip';
import { IconUnion1, IconUnion2, IconUnion3 } from '@/assets';
import { BottomCTAButton } from '@/ui';
import { resultMock } from '../../mock/result.mock';

type Props = { data: typeof resultMock };

type Phase = 'intro' | 'chips' | 'switching' | 'done';

const INTRO_TEXT: Variants = {
  initial: { opacity: 0, y: 22 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.25, ease: 'easeInOut' },
  },
};

const COMPLETE_TEXT: Variants = {
  initial: { opacity: 0, y: -14 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: 'easeInOut' },
  },
};

const CTA: Variants = {
  initial: { opacity: 0, y: -10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: 'easeOut', delay: 0.05 },
  },
};

const CHIPS_CONTAINER = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.1,
    },
  },
} as const;

const CHIP_VARIANTS: Variants = {
  hidden: (custom: { rotate: number }) => ({
    opacity: 0,
    scale: 0.9,
    rotate: custom.rotate,
  }),
  show: {
    opacity: 1,
    scale: [0.9, 1.1, 1],
    transition: { type: 'tween', duration: 0.12, ease: 'easeOut' },
  },
};

const CHIP_POSES = [{ rotate: -9 }, { rotate: 6 }, { rotate: 0 }] as const;

export default function MoodAnimationResult({ data }: Props) {
  const [phase, setPhase] = useState<Phase>('intro');

  return (
    <div className='flex flex-col items-center pt-[9rem]'>
      <div className='relative min-h-[10rem] w-full'>
        <AnimatePresence
          mode='wait'
          onExitComplete={() => {
            if (phase === 'switching') setPhase('done');
          }}
        >
          {(phase === 'intro' || phase === 'chips') && (
            <motion.div
              key='intro-text'
              variants={INTRO_TEXT}
              initial='initial'
              animate='animate'
              exit='exit'
              className='absolute inset-0 flex flex-col items-center gap-[0.3rem]'
              onAnimationComplete={() => {
                if (phase === 'intro') {
                  setTimeout(() => {
                    setPhase('chips');
                  }, 700);
                }
              }}
            >
              <span className='caption-12-md text-black-7'>두구두구</span>
              <h1 className='title-23-eb text-black-10'>무드 큐레이션 결과는...</h1>
            </motion.div>
          )}

          {phase === 'done' && (
            <motion.div
              key='complete-text'
              variants={COMPLETE_TEXT}
              initial='initial'
              animate='animate'
              className='title-23-eb absolute inset-0 flex flex-col items-center gap-[0.5rem]'
            >
              <p>{data.userName}님은</p>

              <div className='flex items-center gap-[0.5rem]'>
                <div className='flex gap-[0.5rem]'>
                  {data.moods.map((mood) => (
                    <div
                      key={mood}
                      className='caption-14-md text-black-10 border-black-10 rounded-[0.3rem] border px-[0.6rem] py-[0.4rem]'
                    >
                      {mood}
                    </div>
                  ))}
                </div>
                <p className='text-black-10'>무드를</p>
              </div>

              <p className='text-black-10'>좋아하시네요</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ✅ 2. intro 끝난 후(chips phase)부터 칩 애니메이션 시작 */}
      {phase !== 'intro' && (
        <motion.div
          key='chips'
          variants={CHIPS_CONTAINER}
          initial='hidden'
          animate='show'
          className='mt-[1.6rem] flex flex-col items-center gap-[0.9rem]'
          onAnimationComplete={() => {
            if (phase === 'chips') {
              setTimeout(() => {
                setPhase('switching');
              }, 700);
            }
          }}
        >
          <motion.div variants={CHIP_VARIANTS} custom={CHIP_POSES[0]}>
            <MoodChip iconLayout='left' icon={<IconUnion1 />} mood={data.moods[0]} />
          </motion.div>

          <motion.div variants={CHIP_VARIANTS} custom={CHIP_POSES[1]}>
            <MoodChip iconLayout='right' icon={<IconUnion2 />} mood={data.moods[1]} />
          </motion.div>

          <motion.div variants={CHIP_VARIANTS} custom={CHIP_POSES[2]}>
            <MoodChip iconLayout='left' icon={<IconUnion3 />} mood={data.moods[2]} />
          </motion.div>
        </motion.div>
      )}
      <AnimatePresence>
        {phase === 'done' && (
          <motion.div
            key='cta'
            variants={CTA}
            initial='initial'
            animate='animate'
            className='fixed-center bottom-0 left-0 w-full transform-gpu will-change-transform'
          >
            <BottomCTAButton className='flex w-full flex-col gap-[0.7rem] px-[2rem] pb-[2rem]'>
              <BottomCTAButton.Single
                color='black'
                size='large'
                onClick={() => console.log('결과')}
              >
                <p>큐레이션 결과 보기</p>
              </BottomCTAButton.Single>

              <BottomCTAButton.Single
                color='white'
                size='large'
                onClick={() => console.log('다시')}
              >
                <p>다시 하기</p>
              </BottomCTAButton.Single>
            </BottomCTAButton>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
