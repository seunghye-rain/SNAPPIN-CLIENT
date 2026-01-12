import { atom } from 'jotai';
import { ToastProps } from './types/toast';

export const ToastDataAtom = atom<ToastProps | null>(null);

export const ToastAtom = atom(null, (_, set, toast: ToastProps) => {
  const newToast = {
    ...toast,
    id: Date.now().toString(),
  };

  set(ToastDataAtom, newToast);
});

export const RemoveToastAtom = atom(null, (_, set) => {
  set(ToastDataAtom, null);
});
