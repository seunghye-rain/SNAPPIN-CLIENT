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
    tab: {
      control: { type: 'select' },
      options: ['client', 'author'] satisfies TabType[],
      description: '사용자 유형',
    },
  },
  args: {
    tab: 'client',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const ToggleWithState = (args: ToggleProps) => {
  const [selectedTab, setSelectedTab] = useState<TabType>(args.tab);

  const handleOnClick = () =>
    setSelectedTab(prev => (prev === 'client' ? 'author' : 'client'));

  return (
    <Toggle
      {...args}
      tab={selectedTab}
      handleOnClick={handleOnClick}
    />
  );
};


export const Client: Story = {
  args: {
    tab: 'client',
  },
  render: ToggleWithState,
};

export const Author: Story = {
  args: {
    tab: 'author',
  },
  render: ToggleWithState,
};
