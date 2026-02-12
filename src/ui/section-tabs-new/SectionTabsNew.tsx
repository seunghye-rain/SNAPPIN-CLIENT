import Link from 'next/link';
import { cn } from '@/utils/cn';

type SectionTabItem = {
  label: string;
  value: string;
};

type SectionTabsNewProps = {
  tabs: SectionTabItem[];
  activeValue: string;
  basePath: string;
  className?: string;
};

export default function SectionTabsNew({
  tabs,
  activeValue,
  basePath,
  className,
}: SectionTabsNewProps) {
  const activeIndex = tabs.findIndex((t) => t.value === activeValue);

  return (
    <div
      className={cn(
        'border-b-black-4 bg-black-1 relative flex h-[4.5rem] w-full border-b px-[2rem]',
        className,
      )}
    >
      {tabs.map(({ label, value }) => {
        const isActive = value === activeValue;

        return (
          <Link
            key={value}
            href={{
              pathname: basePath,
              query: { tab: value },
            }}
            scroll={false}
            className={cn(
              'caption-14-bd flex flex-1 items-center justify-center gap-[0.4rem] transition-colors',
              isActive ? 'text-black-10' : 'text-black-5',
            )}
          >
            {label}
          </Link>
        );
      })}

      {/* indicator */}
      <div
        className='bg-black-10 pointer-events-none absolute bottom-0 h-[0.2rem] transition-transform duration-200 ease-out'
        style={{
          width: `${90 / tabs.length}%`,
          transform: `translateX(${activeIndex * 100}%)`,
        }}
      />
    </div>
  );
}
