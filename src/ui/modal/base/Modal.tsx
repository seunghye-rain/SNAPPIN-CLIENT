import { Button } from '@/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from './Dialog';

type ModalProps = {
  open: boolean;
  handleOpenChange: (open: boolean) => void;
  showCloseButton: boolean;
  children: React.ReactNode;
  className?: string;
};

type ModalSlotProps = {
  children: React.ReactNode;
  className?: string; 
};

export type ModalButtonProps = Omit<React.ComponentProps<typeof Button>, 'children'> & {
  label: string;
};

type ModalButtonsProps = {
  buttons: ModalButtonProps[];
};

export function Modal({
  open,
  handleOpenChange,
  showCloseButton,
  children,
  className,
  ...props
}: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={handleOpenChange} {...props}>
      <DialogPortal>
        <DialogOverlay className='fixed inset-0 bg-black-10/20' />
        <DialogContent showCloseButton={showCloseButton} className={className}>
          {children}
        </DialogContent>  
      </DialogPortal>
    </Dialog>
  );
}

Modal.Header = function ModalHeader({ children, className }: ModalSlotProps) {
  return (
    <DialogHeader className={className}>
      {children}
    </DialogHeader>
  );
}

Modal.Title = function ModalTitle({ children, className }: ModalSlotProps) {
  return (
    <DialogTitle className={className}>
      {children}
    </DialogTitle>
  );
}

Modal.Description = function ModalDescription({ children, className }: ModalSlotProps) {
  return (
    <DialogDescription className={className}>
      {children}
    </DialogDescription>
  );
}

Modal.Footer = function ModalFooter({ children, className }: ModalSlotProps) {
  return (
    <DialogFooter className={className}>
      {children}
    </DialogFooter>
  );
}

Modal.Button = function ModalButton({
  label,
  onClick,
  ...props
}: ModalButtonProps) {
  return (
    <DialogClose asChild>
      <Button onClick={onClick} {...props}>
        {label}
      </Button>
    </DialogClose>
  );
}

Modal.Buttons = function ModalButtons({ buttons }: ModalButtonsProps) {
  return (
    <>
      {buttons.map(({label, ...props}, idx) => (
        <Modal.Button key={idx} label={label} {...props} />
      ))}
    </>
  );
}