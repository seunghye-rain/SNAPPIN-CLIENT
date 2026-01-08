import { DefaultModalType } from '../types/type';

type Theme = {
  contentTheme: string;
  headerTheme: string;
  titleTheme?: string;
};

export const THEME: Record<DefaultModalType, Theme> = {
  'success': { contentTheme: 'p-[1.6rem] gap-[2rem]', headerTheme: 'gap-[1.3rem]' },
  'error': { contentTheme: 'p-[1.5rem] gap-[2rem]', headerTheme: 'gap-[1.4rem]' },
  'default': { contentTheme: 'p-[1.5rem] gap-[1.5rem]', headerTheme: 'gap-[1.4rem]', titleTheme: 'pt-[1rem]' },
}