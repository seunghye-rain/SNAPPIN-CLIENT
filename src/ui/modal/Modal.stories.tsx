import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Modal from './Modal';
import { ModalType } from './types/modalType';
import { ModalContent } from './constants/modalContent';

type DefaultModalWithStateProps = {
  type: 'default';
  content: ModalContent;
};

type PresetModalWithStateProps = {
  type: Exclude<ModalType, 'default'>;
};

type ModalWithStateProps = DefaultModalWithStateProps | PresetModalWithStateProps;

function ModalWithState(props: ModalWithStateProps) {
  const [open, setOpen] = useState(false);
  const handleOpenChange = (open: boolean) => setOpen(open);
  const handleClose = () => setOpen(false);
  const handleConfirm = () => {
    alert('handleRightClick 실행 완료');
    setOpen(false);
  }

  return (
    <>
      <button onClick={() => setOpen(true)}>모달 열기</button>
      {props.type === 'default'
        ? <Modal
            type='default'
            content={props.content}
            open={open}
            handleOpenChange={handleOpenChange}
            handleLeftClick={handleClose}
            handleRightClick={handleConfirm}
          />
        : <Modal
            type={props.type}
            open={open}
            handleOpenChange={handleOpenChange}
            handleLeftClick={handleClose}
            handleRightClick={handleConfirm}
          />
      }
    </>
  );
}

const meta: Meta = {
  title: 'Modal',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '모달 컴포넌트입니다.',
      }
    }
  },
};

export default meta;
type Story = StoryObj;

export const Success: Story = {
  render: () => <ModalWithState type='success' />,
};

export const Error: Story = {
  render: () => <ModalWithState type='error' />,
};

export const Refused: Story = {
  render: () => (
    <ModalWithState
      type='default'
      content={{ title: { type: 'single', text: '예약을 거절할까요?' }, leftButton: '아니요', rightButton: '네, 거절할게요', }}
    />
  ),
};

export const Canceled: Story = {
  render: () => (
    <ModalWithState
      type='default'
      content={{ title: { type: 'multiple', text: ['예약하신 스냅 일정을', '취소할까요?'] }, leftButton: '아니요', rightButton: '네, 취소할게요', }}
    />
  ),
};

export const Confirmed: Story = {
  render: () => (
    <ModalWithState
      type='default'
      content={{ title: { type: 'single', text: '예약을 확정할까요?' }, leftButton: '아니요', rightButton: '네, 확정할게요', }}
    />
  ),
};