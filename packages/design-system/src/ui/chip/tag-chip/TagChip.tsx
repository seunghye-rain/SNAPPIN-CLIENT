import { TagChipVariant } from '@ds/ui/chip/tag-chip/types/tagChipVariant';
import { TAG_CHIP_THEME_BY_VARIANT } from '@ds/ui/chip/tag-chip/constants/tagChipTheme';
import { Chip } from '@ds/ui';
import { cn } from '@ds/lib/cn';

type TagChipProps = {
  variant: TagChipVariant;
  label: string;
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'className'>;

export default function TagChip({ variant, label, ...props }: TagChipProps) {
  const { chipClassName, labelClassName } = TAG_CHIP_THEME_BY_VARIANT[variant];

  return (
    <Chip
      label={label}
      chipClassName={cn('px-[0.6rem] py-[0.3rem] shrink-0', chipClassName)}
      labelClassName={labelClassName}
      {...props}
    />
  );
}
