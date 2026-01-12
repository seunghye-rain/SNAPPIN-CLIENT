'use client';

import { useAtomValue } from 'jotai';
import { ToastDataAtom } from './toast.atom';
import Toast from './Toast';
import { cn } from '@/utils/cn';

export default function ToastContainer() {
  const toast = useAtomValue(ToastDataAtom);
  const positionClassName =
    toast?.positionClassName ?? (toast?.type === 'login' ? 'bottom-[calc(7.2rem+2rem)]' : 'top-[1rem]');

  return (
    <div
      className={cn(
        'fixed-center z-50 w-full px-[1rem]',
        positionClassName,
      )}
    >
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          duration={toast.duration}
          className={toast.className}
        />
      )}
    </div>
  );
}
