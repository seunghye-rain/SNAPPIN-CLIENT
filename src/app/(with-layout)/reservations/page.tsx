import { ReservationListSection, ShootCompletedListSection } from './_section';
import { ClientNavigation } from './components';
import { RESERVATION_TAB, RESERVATION_TAB_MAP } from './constants/tabs';
import { SectionTabsNew } from '@/ui';

const RESERVATION_TABS = [
  { label: RESERVATION_TAB_MAP.CLIENT_OVERVIEW, value: RESERVATION_TAB.CLIENT_OVERVIEW },
  { label: RESERVATION_TAB_MAP.CLIENT_DONE, value: RESERVATION_TAB.CLIENT_DONE },
];

type PageProps = {
  searchParams: Promise<{ tab?: string }>;
};

export default async function Page({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;

  const activeTabValue = resolvedSearchParams.tab ?? RESERVATION_TAB.CLIENT_OVERVIEW;

  return (
    <div className='bg-black-1 flex min-h-full flex-col'>
      <header className='sticky top-0 z-100'>
        <ClientNavigation />
        <SectionTabsNew
          tabs={RESERVATION_TABS}
          activeValue={activeTabValue}
          basePath='/reservations'
        />
      </header>

      {activeTabValue === RESERVATION_TAB.CLIENT_OVERVIEW ? (
        <ReservationListSection />
      ) : (
        <ShootCompletedListSection />
      )}
    </div>
  );
}
