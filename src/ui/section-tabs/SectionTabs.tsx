'use client';

import { cn } from '@/utils/cn';
import type { SectionTabsProps } from './types/sectionTab.types';

export default function SectionTabs({
  tabs,
  selectedTab,
  onChangeTab,
  getLabel,
}: SectionTabsProps) {
  return (
    <div className='border-black-4 flex h-[45px] w-full gap-[10px] border-b px-[20px]'>
      {tabs.map((tab) => {
        const isSelected = tab === selectedTab;

        return (
          <button
            key={tab}
            type='button'
            onClick={() => onChangeTab(tab)}
            className='relative flex flex-1 items-center justify-center bg-transparent'
          >
            <span
              className={cn(
                'caption-14-bd transition-colors',
                isSelected ? 'text-black' : 'text-black-5',
              )}
            >
              {getLabel(tab)}
            </span>

            {isSelected ? (
              <span className='bg-black-10 absolute bottom-0 left-0 h-[2px] w-full' />
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
