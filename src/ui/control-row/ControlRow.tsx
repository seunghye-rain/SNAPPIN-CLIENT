import { cn } from '@/utils/cn';

type StepperRowProps = {
  leftLabel: React.ReactNode;
  rightControl: React.ReactNode;
  className?: string;
  centered?: boolean;
};

export default function ControlRow({
  leftLabel,
  rightControl,
  centered = false,
  className,
}: StepperRowProps) {
  return (
    <div className={cn('flex justify-between', centered && 'items-center', className)}>
      {leftLabel}
      {rightControl}
    </div>
  );
}
