import { Header, ImageSlide } from './components/index';
import ReviewStar from '@/ui/review-star/ReviewStar';
import { formatShortDate } from '@/utils/formatNumberWithComma';
import REVIEW from './mock/review.mock';

export default function Page() {
  const reviewMock = REVIEW;
  const reviewImages = reviewMock.images.map((image, idx) => ({ src: image, alt: `리뷰 이미지 ${idx}` }));
  const formattedDate = formatShortDate(reviewMock.createdAt);

  return (
    <div className='flex flex-col h-dvh bg-black-10'>
      <Header />
      <div className='flex flex-1 items-center'>
        <ImageSlide images={reviewImages} />
      </div>
      <div className='flex flex-col gap-[1.2rem] px-[2rem] pt-[2rem] pb-[6rem]'>
        <div className='flex flex-col gap-[0.6rem]'>
          <div className='flex justify-between'>
            <ReviewStar rating={reviewMock.rating} starSize='small' starFillColor='text-neon-black' />
            <span className='caption-12-md text-black-7'>{formattedDate}</span>
          </div>
          <span className='caption-12-md text-black-7'>{reviewMock.reviewer}</span>
        </div>
        <span className='caption-14-md text-black-1'>{reviewMock.content}</span>
      </div>
    </div>
  );
}