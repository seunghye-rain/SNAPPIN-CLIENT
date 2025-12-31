import { cn } from '@/utils/cn';
import { StateChipLabel } from '@/ui/chip/state-chip/types/stateChipLabel';
import { TagChipLabel } from '@/ui/chip/tag-chip/types/tagChipLabel';

type ChipProps = {
  label: StateChipLabel | TagChipLabel;
  chipStyle: string;
  labelColor: string;
  className?: string;
};

export default function Chip({
  label,
  chipStyle,
  labelColor,
  className,
  ...props
}: ChipProps) {
  return (
    <div
      className={cn(
        'inline-flex justify-center items-center rounded-[0.3rem]',
        chipStyle,
        className
      )}
      {...props}
    >
      <span className={cn('caption-12-md', labelColor)}>
        {label}
      </span>
    </div>
  );
}