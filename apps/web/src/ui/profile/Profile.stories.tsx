import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Profile from './Profile';
import { IconArrowForward } from '@snappin/design-system/assets';

const meta: Meta<typeof Profile> = {
  title: 'UI/ProfileItem',
  component: Profile,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Profile>;

export const ShortcutCard: Story = {
  render: () => (
    <div className='border-black-9 w-[32rem] border-[0.1rem]'>
      <Profile size='sm'>
        <Profile.Avatar src='/imgs/default-profile.png' />
        <Profile.Content lines={1}>
          <Profile.Item>
            <Profile.Title>나작가</Profile.Title>
            <Profile.Value>서울</Profile.Value>
          </Profile.Item>
        </Profile.Content>
      </Profile>
    </div>
  ),
};

export const CompoundInline: Story = {
  render: () => (
    <div className='border-black-9 w-[32rem] border-[0.1rem]'>
      <Profile size='sm'>
        <Profile.Avatar src='/imgs/default-profile.png' />
        <Profile.Content lines={2}>
          <Profile.Item>
            <Profile.Title>나작가</Profile.Title>
            <Profile.Description>내일의 나를 기록합니다</Profile.Description>
          </Profile.Item>
          <Profile.Item>
            <Profile.Row>
              <Profile.Meta className='shrink-0'>촬영 상품</Profile.Meta>
              <Profile.Meta>졸업스냅, 웨딩스냅, 일상스냅</Profile.Meta>
            </Profile.Row>
            <Profile.Row>
              <Profile.Meta className='shrink-0'>활동 지역</Profile.Meta>
              <Profile.Meta>서울</Profile.Meta>
            </Profile.Row>
          </Profile.Item>
        </Profile.Content>
        <Profile.Trailing />
      </Profile>
    </div>
  ),
};

export const CompoundCard: Story = {
  render: () => (
    <div className='border-black-9 w-[36rem] border-[0.1rem]'>
      <Profile>
        <Profile.Avatar src='/imgs/default-profile.png' />
        <Profile.Content lines={2}>
          <Profile.Item>
            <Profile.Title>나작가</Profile.Title>
            <Profile.Description>내일의 나를 기록합니다</Profile.Description>
          </Profile.Item>
          <Profile.Item>
            <Profile.Row>
              <Profile.Meta className='shrink-0'>촬영 상품</Profile.Meta>
              <Profile.Meta className='text-black-9'>
                졸업스냅, 웨딩스냅, 일상스냅
              </Profile.Meta>
            </Profile.Row>
            <Profile.Row>
              <Profile.Meta className='shrink-0'>활동 지역</Profile.Meta>
              <Profile.Meta>서울</Profile.Meta>
            </Profile.Row>
          </Profile.Item>
        </Profile.Content>
        <Profile.Trailing />
      </Profile>
    </div>
  ),
};

export const ShortcutSingleLine: Story = {
  render: () => (
    <div className='border-black-9 w-[32rem] border-[0.1rem]'>
      <Profile>
        <Profile.Avatar src='/imgs/default-profile.png' />
        <Profile.Content lines={1}>
          <Profile.Item>
            <Profile.Title>나작가</Profile.Title>
            <Profile.Value>서울</Profile.Value>
          </Profile.Item>
        </Profile.Content>
      </Profile>
    </div>
  ),
};

export const AsChildAnchor: Story = {
  render: () => (
    <div className='border-black-9 w-[32rem] border-[0.1rem]'>
      <a href='/profile' className='block'>
        <Profile>
          <Profile.Avatar src='/imgs/default-profile.png' />
          <Profile.Content lines={1}>
            <Profile.Item>
              <Profile.Title>링크형 프로필</Profile.Title>
              <Profile.Value>바로가기</Profile.Value>
            </Profile.Item>
          </Profile.Content>
          <Profile.Trailing />
        </Profile>
      </a>
    </div>
  ),
};

export const CustomTrailingIcon: Story = {
  render: () => (
    <div className='border-black-9 w-[37.5rem] border-[0.1rem]'>
      <Profile>
        <Profile.Avatar size='md' src='/imgs/default-profile.png' />
        <Profile.Content lines={1}>
          <Profile.Item>
            <Profile.Title>나작가</Profile.Title>
            <Profile.Value>서울</Profile.Value>
          </Profile.Item>
        </Profile.Content>
        <Profile.Trailing>
          <IconArrowForward className='text-black-6 h-[2.4rem] w-[2.4rem]' />
        </Profile.Trailing>
      </Profile>
    </div>
  ),
};

export const TrailingButton: Story = {
  render: () => (
    <div className='border-black-9 w-[32rem] border-[0.1rem]'>
      <Profile>
        <Profile.Avatar src='/imgs/default-profile.png' />
        <Profile.Content lines={1}>
          <Profile.Item>
            <Profile.Title>나작가</Profile.Title>
            <Profile.Value>서울</Profile.Value>
          </Profile.Item>
        </Profile.Content>
        <Profile.Trailing>
          <button
            type='button'
            className='caption-12-rg bg-black-10 text-black-1 rounded-[0.4rem] px-[1.2rem] py-[0.6rem]'
          >
            편집
          </button>
        </Profile.Trailing>
      </Profile>
    </div>
  ),
};
