import { HTMLAttributes, ReactNode } from 'react';
import Link from 'next/link';
import { cn } from '@/utils/cn';

type TabProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

function Tab({ className, children, ...props }: TabProps) {
  return (
    <div className={cn('w-full', className)} {...props}>
      {children}
    </div>
  );
}

type TabsListProps = HTMLAttributes<HTMLDivElement> & {
  activeValue: string;
  tabs: { value: string }[];
  children: ReactNode;
};

function TabsList({ activeValue, tabs, className, children, ...props }: TabsListProps) {
  const activeIndex = tabs.findIndex((tab) => tab.value === activeValue);

  return (
    <div
      className={cn('border-black-4 relative flex h-[4.5rem] w-full border-b px-[2rem]', className)}
      {...props}
    >
      {children}
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

type TabItemProps = {
  value: string;
  activeValue: string;
  href: string;
  children: ReactNode;
  className?: string;
};

function TabItem({ value, activeValue, href, children, className }: TabItemProps) {
  const isActive = value === activeValue;

  return (
    <Link
      href={href}
      scroll={false}
      className={cn(
        'caption-14-bd flex flex-1 items-center justify-center transition-colors',
        isActive ? 'text-black-10' : 'text-black-5',
        className,
      )}
    >
      {children}
    </Link>
  );
}

const Tabs = Object.assign(Tab, { List: TabsList, Item: TabItem });

export default Tabs;
