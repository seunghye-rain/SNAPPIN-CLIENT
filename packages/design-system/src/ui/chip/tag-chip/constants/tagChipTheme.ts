import { TagChipVariant } from '@ds/ui/chip/tag-chip/types/tagChipVariant';
import { ChipTheme } from '@ds/ui/chip/types/chipTheme';

export const TAG_CHIP_THEME_BY_VARIANT: Record<TagChipVariant, ChipTheme> = {
  neon: { chipClassName: 'bg-neon-black', labelClassName: 'text-black-9' },
  gray: { chipClassName: 'bg-black-3', labelClassName: 'text-black-8' },
  transparent: {
    chipClassName: 'bg-transparent border-[0.07rem] border-black-1',
    labelClassName: 'text-black-1',
  },
};
