import { cn } from '@/utils/cn';

type TimeButtonState = 'default' | 'clicked' | 'disabled';

type TimeButtonProps = {
  time: string;
  state?: TimeButtonState;
  onClick?: (time: string) => void;
};

export const TimeButton = ({ time, state = 'default', onClick }: TimeButtonProps) => {
  const isDisabled = state === 'disabled';

  return (
    <button
      type='button'
      disabled={isDisabled}
      onClick={isDisabled ? undefined : () => onClick?.(time)}
      className={cn(
        'caption-14-md',
        'flex items-center justify-center w-[7.4rem] h-[3.3rem] transition-colors',
        'rounded border',
        state === 'default' && 'border-black-4 text-black-10 bg-black-1',

        state === 'clicked' && 'border-neon-white bg-neon-white text-black-10',

        state === 'disabled' && 'text-black-6 cursor-not-allowed border-black-4 bg-black-1',
      )}
    >
      {time}
    </button>
  );
};
