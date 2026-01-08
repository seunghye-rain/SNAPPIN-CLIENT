const MODAL_TYPE = ['success', 'error', 'default'] as const;
export type ModalType = typeof MODAL_TYPE[number];