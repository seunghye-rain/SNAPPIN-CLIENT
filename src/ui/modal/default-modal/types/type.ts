const DEFAULT_MODAL_TYPES = ['success', 'error', 'default'] as const;
export type DefaultModalType = typeof DEFAULT_MODAL_TYPES[number];