import { cn } from '@/utils/cn';
import { ButtonColor, ButtonDisplay, ButtonSize } from '@/ui/button/base/types/variant';
import {
  BUTTON_BASE,
  BUTTON_COLOR,
  BUTTON_DISABLED,
  BUTTON_DISPLAY,
  BUTTON_SIZE,
} from '@/ui/button/base/constants/theme';

type ButtonProps = {
  children: React.ReactNode;
  display?: ButtonDisplay;
  size?: ButtonSize;
  color?: ButtonColor;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  isLoading?: boolean;
};

export default function Button({
  children,
  display = 'block',
  size = 'large',
  color = 'primary',
  disabled = false,
  onClick,
  type = 'button',
  isLoading = false,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={cn(
        BUTTON_BASE,
        BUTTON_DISPLAY[display],
        BUTTON_SIZE[size],
        BUTTON_COLOR[color],
        BUTTON_DISABLED,
      )}
      disabled={disabled}
      aria-busy={isLoading || undefined}
    >
      {children}
    </button>
  );
}
