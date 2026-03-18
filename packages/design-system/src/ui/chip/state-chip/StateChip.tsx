import { StateCode } from '@snappin/shared/types';
import { STATE_CHIP_THEME_BY_LABEL } from '@ds/ui/chip/state-chip/constants/stateChipTheme';
import { Chip } from '@ds/ui';
import { STATE_LABEL } from '@ds/ui/chip/state-chip/constants/stateLabel';
import { cn } from '@ds/lib/cn';

type StateChipProps = {
  label: StateCode;
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'className'>;

export default function StateChip({ label, ...props }: StateChipProps) {
  const { chipClassName, labelClassName } = STATE_CHIP_THEME_BY_LABEL[label];

  return (
    <Chip
      label={STATE_LABEL[label]}
      chipClassName={cn('px-[0.5rem] py-[0.2rem]', chipClassName)}
      labelClassName={labelClassName}
      {...props}
    />
  );
}
