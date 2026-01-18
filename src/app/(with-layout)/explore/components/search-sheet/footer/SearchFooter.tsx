import { BottomCTAButton, Button } from '@/ui';

type SearchFooterProps = {
  handleLeftClick?: () => void;
  handleRightClick?: () => void;
  rightDisabled?: boolean;
};

export default function SearchFooter({
  handleLeftClick,
  handleRightClick,
  rightDisabled,
}: SearchFooterProps) {
  return (
    <BottomCTAButton>
      <BottomCTAButton.Double
        className={'justify-between px-[2rem] pb-[2.6rem]'}
        leftButton={
          <Button
            onClick={handleLeftClick}
            color='white'
            className='caption-14-bd w-[8.2rem] w-[9.2rem] border-0 py-[1.25rem]'
          >
            전체 해제
          </Button>
        }
        rightButton={
          <Button
            onClick={handleRightClick}
            color='black'
            className='caption-14-bd w-[8.2rem] rounded-[0.4rem] py-[1.25rem]'
            disabled={rightDisabled}
          >
            확인
          </Button>
        }
      />
    </BottomCTAButton>
  );
}
