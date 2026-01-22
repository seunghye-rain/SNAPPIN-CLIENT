'use client';

import { RefObject, useEffect, useLayoutEffect, useMemo, useRef } from 'react';

type Options = {
  /**
   * 복원 재시도 스케줄(ms)
   * - dynamic(ssr:false), 이미지 로딩 등으로 레이아웃이 늦게 안정화되면 1회 복원으로는 부족할 수 있음
   */
  restoreScheduleMs?: number[]; // default: [0, 50, 150, 300, 600]

  /**
   * 복원 직후 저장을 잠깐 막아서 0 덮어쓰기(라우트 전환/레이아웃 리셋) 방지
   */
  freezeSaveAfterRestoreMs?: number; // default: 400

  /**
   * scroll 이벤트 저장을 rAF로 throttle 할지
   */
  saveThrottleFrame?: boolean; // default: true

  /**
   * 훅 활성화 여부
   */
  enabled?: boolean; // default: true
};

const isScrollableOverflow = (overflowY: string) =>
  overflowY === 'auto' || overflowY === 'scroll' || overflowY === 'overlay';

// “overflow 설정”뿐 아니라 “실제로 스크롤 가능한지(scrollHeight > clientHeight)”까지 확인
const isActuallyScrollable = (el: HTMLElement) => el.scrollHeight - el.clientHeight > 1;

const getScrollParent = (el: HTMLElement | null) => {
  let cur: HTMLElement | null = el;

  while (cur) {
    const { overflowY } = window.getComputedStyle(cur);

    if (isScrollableOverflow(overflowY) && isActuallyScrollable(cur)) {
      return cur;
    }

    cur = cur.parentElement;
  }

  // fallback: window 스크롤(document.scrollingElement)
  return document.scrollingElement as HTMLElement;
};

export const useScrollRestoreOnParent = (
  anchorRef: RefObject<HTMLElement | null>,
  storageKey: string,
  restoreDeps: unknown[] = [],
  options: Options = {},
) => {
  const {
    enabled = true,
    restoreScheduleMs = [0, 50, 150, 300, 600],
    freezeSaveAfterRestoreMs = 400,
    saveThrottleFrame = true,
  } = options;

  const key = useMemo(() => storageKey, [storageKey]);
  const freezeUntilRef = useRef(0);

  /**
   * 저장: 내부 스크롤 컨테이너 + window 스크롤 둘 다 리슨
   * - 실제 스크롤 주체가 상황에 따라 달라져도 저장이 끊기지 않게 하기 위함
   */
  useEffect(() => {
    if (!enabled) return;

    const anchor = anchorRef.current;
    if (!anchor) return;

    const parentScrollEl = getScrollParent(anchor);
    const docScrollEl = document.scrollingElement as HTMLElement | null;

    let raf = 0;

    const save = (scrollEl: HTMLElement) => {
      if (Date.now() < freezeUntilRef.current) return;

      // ✅ 라우트 전환/레이아웃 리셋 순간 scrollTop=0이 튀면서 기존 값을 덮는 경우 방지
      const prev = sessionStorage.getItem(key);
      if (scrollEl.scrollTop === 0 && prev && Number(prev) > 0) return;

      sessionStorage.setItem(key, String(scrollEl.scrollTop));
    };

    const onScrollParent = () => {
      if (!saveThrottleFrame) return save(parentScrollEl);
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => save(parentScrollEl));
    };

    const onScrollWindow = () => {
      if (!docScrollEl) return;

      if (!saveThrottleFrame) return save(docScrollEl);
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => save(docScrollEl));
    };

    parentScrollEl.addEventListener('scroll', onScrollParent, { passive: true });
    window.addEventListener('scroll', onScrollWindow, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      parentScrollEl.removeEventListener('scroll', onScrollParent);
      window.removeEventListener('scroll', onScrollWindow);
    };
  }, [anchorRef, enabled, key, saveThrottleFrame]);

  /**
   * 복원: 레이아웃이 늦게 안정화되는 케이스를 대비해 스케줄 기반으로 여러 번 재적용
   * - 복원 직후에는 저장을 잠깐 막아서 0 덮어쓰기 방지
   */
  useLayoutEffect(() => {
    if (!enabled) return;

    const anchor = anchorRef.current;
    if (!anchor) return;

    const raw = sessionStorage.getItem(key);
    if (!raw) return;

    const top = Number(raw);
    if (Number.isNaN(top)) return;

    freezeUntilRef.current = Date.now() + freezeSaveAfterRestoreMs;

    const parentScrollEl = getScrollParent(anchor);
    const docScrollEl = document.scrollingElement as HTMLElement | null;

    const timers: number[] = [];

    const apply = () => {
      parentScrollEl.scrollTop = top;
      if (docScrollEl && docScrollEl !== parentScrollEl) {
        docScrollEl.scrollTop = top;
      }
    };

    for (const ms of restoreScheduleMs) {
      timers.push(window.setTimeout(apply, ms));
    }

    return () => {
      timers.forEach((id) => window.clearTimeout(id));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, key, freezeSaveAfterRestoreMs, ...restoreDeps]);
};
