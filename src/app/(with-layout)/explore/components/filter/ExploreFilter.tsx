'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FilterChip, IconButton } from '@/ui';
import { IconFilter, IconSettingsBackupRestore } from '@/assets';
import { ExploreFilterPanel } from '@/app/(with-layout)/explore/components';
import { useMoodFilters } from '@/app/(with-layout)/explore/api';
import { GetMoodFilterResponse } from '@/swagger-api/data-contracts';

const SKIP_AUTO_APPLY_ON_RETURN_KEY = 'explore_skip_auto_apply_on_return_v1';

const isDetailPath = (path: string) =>
  path.startsWith('/product-detail/') || path.startsWith('/portfolio-detail/');

const isExplorePath = (path: string) => path === '/explore';

const parseMoodIds = (params: URLSearchParams): number[] => {
  const rawMoodIds = params.get('moodIds');
  if (!rawMoodIds) return [];
  return rawMoodIds
    .split(',')
    .map(Number)
    .filter((num) => !Number.isNaN(num));
};

export default function ExploreFilter() {
  const { data } = useMoodFilters();
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const moodIds = useMemo(() => parseMoodIds(searchParams), [searchParams]);

  const userResetRef = useRef(false);
  const autoAppliedRef = useRef(false);
  const prevPathRef = useRef<string | null>(null);

  const popRef = useRef(false);

  // 뒤로가기/앞으로가기 감지
  useEffect(() => {
    const onPopState = () => {
      popRef.current = true;
    };

    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    const prev = prevPathRef.current;
    prevPathRef.current = pathname;

    if (!prev) return;

    // explore -> detail 로 나갈 때: "복귀 시 자동세팅 금지" 플래그 세팅
    if (isExplorePath(prev) && isDetailPath(pathname)) {
      sessionStorage.setItem(SKIP_AUTO_APPLY_ON_RETURN_KEY, 'true');
      return;
    }

    // explore -> (detail 제외 다른 곳) 로 나가면: 방문 상태 리셋(원하면)
    if (isExplorePath(prev) && !isExplorePath(pathname) && !isDetailPath(pathname)) {
      userResetRef.current = false;
      autoAppliedRef.current = false;
      sessionStorage.removeItem(SKIP_AUTO_APPLY_ON_RETURN_KEY);
    }
  }, [pathname]);

  const curatedIds = useMemo(() => {
    return (data.moods ?? [])
      .filter((m) => m.isCurated)
      .map((m) => m.id)
      .filter((id): id is number => typeof id === 'number');
  }, [data.moods]);

  const replaceMoodIds = (nextIds: number[]) => {
    const params = new URLSearchParams(searchParams.toString());
    if (nextIds.length === 0) params.delete('moodIds');
    else params.set('moodIds', nextIds.join(','));

    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname);
  };

  const moodById = useMemo(() => {
    const map = new Map<number, GetMoodFilterResponse>();
    data.moods?.forEach((m) =>
      map.set(m.id!, {
        name: m.name ?? '',
        id: m.id ?? 0,
        category: m.category ?? '스타일',
        isCurated: m.isCurated ?? false,
      }),
    );
    return map;
  }, [data]);

  const selectedMoods = useMemo(() => {
    return moodIds
      .map((id) => moodById.get(id))
      .filter((m): m is GetMoodFilterResponse => Boolean(m));
  }, [moodIds, moodById]);

  const handleReset = () => {
    // 유저가 빈 상태를 의도함 → 이번 방문 동안 자동세팅 금지
    userResetRef.current = true;
    replaceMoodIds([]); // moodIds 제거
  };

  const handleRemoveMood = (removeId: number) => {
    const nextIds = moodIds.filter((id) => id !== removeId);

    if (nextIds.length === 0) {
      // 마지막까지 삭제 = 유저가 빈 상태 의도
      userResetRef.current = true;
      replaceMoodIds([]);
      return;
    }

    replaceMoodIds(nextIds);
  };

  useEffect(() => {
    if (!isExplorePath(pathname)) return;

    // explore<-detail 복귀면 자동세팅 금지
    const skip = sessionStorage.getItem(SKIP_AUTO_APPLY_ON_RETURN_KEY) === 'true';
    if (skip) {
      sessionStorage.removeItem(SKIP_AUTO_APPLY_ON_RETURN_KEY); // 1회 소모
      return;
    }

    if (moodIds.length > 0) return;
    if (userResetRef.current) return;
    if (autoAppliedRef.current) return;
    if (curatedIds.length === 0) return;

    autoAppliedRef.current = true;
    replaceMoodIds(curatedIds);
  }, [pathname, moodIds, curatedIds, router, searchParams]);

  return (
    <>
      <div className='relative flex flex-row items-center justify-between gap-[0.3rem] px-[0.4rem] py-[0.6rem]'>
        {/* 필터 초기화 버튼 */}
        <IconButton
          className='h-[4.4rem] w-[4.4rem] px-[1.05rem] py-[1rem]'
          onClick={handleReset}
          aria-label='무드 필터 초기화'
        >
          <IconSettingsBackupRestore />
        </IconButton>

        {/* 필터 칩 목록 */}
        <div className='scrollbar-hide flex flex-1 flex-row gap-[0.4rem] overflow-x-auto'>
          {selectedMoods.length === 0 ? (
            <span className='caption-14-rg text-black-6'>무드필터를 이용해서 검색해 보세요</span>
          ) : (
            selectedMoods.map((mood) => (
              <FilterChip
                key={mood.id}
                label={mood.name ?? ''}
                onRemove={() => handleRemoveMood(mood.id ?? 0)}
                isSelected
              />
            ))
          )}
        </div>

        <IconButton
          className='border-black-3 before:bg-black-4 relative h-[4.4rem] w-[4.4rem] p-[1rem] before:absolute before:top-1/2 before:left-[-0.05rem] before:h-[3.1rem] before:w-[0.1rem] before:-translate-y-1/2 before:content-[""]'
          aria-expanded={open}
          aria-label='무드 필터 패널 열기'
          onClick={() => setOpen(!open)}
        >
          <IconFilter />
        </IconButton>
      </div>
      {open && (
        <div className='bg-black-1 absolute top-full right-0 left-0 z-100'>
          <ExploreFilterPanel
            key={moodIds.join(',')}
            moodList={data.moods}
            selectedMoodIds={moodIds}
            handlePanelClose={() => setOpen(false)}
          />
        </div>
      )}
    </>
  );
}
