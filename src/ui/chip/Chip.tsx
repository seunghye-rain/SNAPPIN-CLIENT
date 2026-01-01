import { cn } from '@/utils/cn';
import { StateChipLabel } from '@/ui/chip/state-chip/types/stateChipLabel';
import { TagChipLabel } from '@/ui/chip/tag-chip/types/tagChipLabel';

type ChipProps = {
  label: StateChipLabel | TagChipLabel;
  chipClassName: string;
  labelClassName: string;
  className?: string;
};

export default function Chip({
  label,
  chipClassName,
  labelClassName,
  className,
  ...props
}: ChipProps) {
  return (
    <div
      className={cn(
        'inline-flex justify-center items-center rounded-[0.3rem]',
        chipClassName,
        className
      )}
      {...props}
    >
      <span className={cn('caption-12-md', labelClassName)}>
        {label}
      </span>
    </div>
  );
}