'use client';

import { cn } from '@/utils/cn';
import { useMemo, useRef, useState, useEffect, useCallback } from 'react';

type SectionTabItem = {
  label: string;
  value: string;
};

type SectionTabsNewProps = {
  tabs: SectionTabItem[];
  activeValue: string;
  onChange: (value: string) => void;
  className?: string;
};

export default function SectionTabsNew({
  tabs,
  activeValue,
  onChange,
  className,
}: SectionTabsNewProps) {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const [indicatorStyle, setIndicatorStyle] = useState({
    leftRem: 0,
    widthRem: 0,
  });

  const activeIndex = useMemo(
    () => tabs.findIndex(({ value }) => value === activeValue),
    [tabs, activeValue],
  );

  const handleIndicatorUpdate = useCallback(() => {
    const activeElement = tabRefs.current[activeIndex];

    if (!activeElement) {
      return;
    }

    setIndicatorStyle({
      leftRem: activeElement.offsetLeft / 10,
      widthRem: activeElement.offsetWidth / 10,
    });
  }, [activeIndex]);

  useEffect(() => {
    handleIndicatorUpdate();
  }, [handleIndicatorUpdate]);

  const handleClickTab = (value: string) => {
    onChange(value);
  };

  return (
    <div className={cn('border-b-black-4 relative flex h-[4.5rem] w-full border-b', className)}>
      {tabs.map(({ label, value }, index) => {
        const isActive = value === activeValue;

        return (
          <button
            key={value}
            ref={(element) => {
              tabRefs.current[index] = element;
            }}
            type='button'
            onClick={() => handleClickTab(value)}
            className={cn(
              'caption-14-bd flex-1 text-center transition-colors',
              isActive ? 'text-black-10' : 'text-black-5',
            )}
          >
            {label}
          </button>
        );
      })}

      <span
        className='bg-black-10 pointer-events-none absolute bottom-0 left-0 h-[0.2rem] transition-[transform,width] duration-200 ease-out'
        style={{
          width: `${indicatorStyle.widthRem}rem`,
          transform: `translateX(${indicatorStyle.leftRem}rem)`,
        }}
      />
    </div>
  );
}
