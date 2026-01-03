import { cn } from '@/utils/cn';
import { DividerColor } from '@/ui/divider/type/variant';
import { DIVIDER_COLOR } from '@/ui/divider/constants/theme';

type DividerProps = {
  thickness?: number;
  color?: DividerColor;
};

export default function Divider({ thickness = 6, color = 'gray-light' }: DividerProps) {
  return <div style={{ height: thickness }} className={cn(DIVIDER_COLOR[color])} />;
}
