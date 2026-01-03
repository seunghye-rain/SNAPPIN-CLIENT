import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Toggle, { ToggleProps } from './Toggle';
import { TabType } from './types/tabType';

const meta: Meta<typeof Toggle> = {
  title: 'Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '고객/작가 토글 컴포넌트입니다.',
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    selectedTab: {
      control: { type: 'select' },
      options: ['client', 'author'] satisfies TabType[],
      description: '사용자 유형',
    },
  },
  args: {
    selectedTab: 'client',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const ToggleWithState = (args: ToggleProps) => {
  const [selectedTab, setSelectedTab] = useState<TabType>(args.selectedTab);

  const handleOnClick = () =>
    setSelectedTab(prev => (prev === 'client' ? 'author' : 'client'));

  return (
    <Toggle
      {...args}
      selectedTab={selectedTab}
      onClick={handleOnClick}
    />
  );
};


export const Client: Story = {
  args: {
    selectedTab: 'client',
  },
  render: ToggleWithState,
};

export const Author: Story = {
  args: {
    selectedTab: 'author',
  },
  render: ToggleWithState,
};
