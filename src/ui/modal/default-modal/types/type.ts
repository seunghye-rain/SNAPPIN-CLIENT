const DEFAULT_MODAL_TYPE = ['success', 'error', 'default'] as const;
export type DefaultModalType = typeof DEFAULT_MODAL_TYPE[number];