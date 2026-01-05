import { cn } from '@/utils/cn';
import { IconButton } from '@/ui/button';
import { IconClose } from '@/assets';
import { FilterChipStatus } from './types/filterChipStatus';
import { FILTER_CHIP_THEME } from './constants/filterChipTheme';
// TODO: 공용 타입으로 변경
import { TagCode } from '../tag-chip/types/tagCode';
import { TAG_LABEL } from '../tag-chip/constants/tagLabel';

export type FilterChipProps = {
  label: TagCode;
  status: FilterChipStatus;
  onClick: () => void;
}

export default function FilterChip({
  label,
  status,
  onClick,
  ...props
}: FilterChipProps) {
  const { buttonClassName, labelClassName } = FILTER_CHIP_THEME[status];
  const isSelected = status === 'selected' || status === 'removable';
  const removable = status === 'removable';

  return (
    <div
      className={cn(
        'inline-flex justify-center items-center py-[0.6rem] bg-black-10 rounded-[0.4rem] transition-[background-color] duration-500 ease-in-out',
        buttonClassName
      )}
      {...props}
    >
      <button
        aria-label={`${TAG_LABEL[label]} 필터`}
        aria-pressed={isSelected}
        onClick={!removable ? onClick : undefined}
      >
        <span className={cn('caption-12-md transition-[color] duration-500 ease-in-out', labelClassName)}>
          {TAG_LABEL[label]}
        </span>
      </button>
      { removable && (
        <IconButton onClick={onClick}>
          <IconClose
            className='w-[1.5rem] h-[1.5rem] m-[0.4rem] text-black-7'
          />
        </IconButton>
      )}
    </div>
  );
}