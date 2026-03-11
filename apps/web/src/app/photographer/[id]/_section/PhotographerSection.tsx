import Image from 'next/image';

type PhotographerSectionProps = {
  name: string;
  imageUrl: string;
  bio: string;
  specialties: string[];
  locations: string[];
};

type DetailRowProps = {
  label: string;
  content: string[];
};

export function PhotographerSection({
  name,
  imageUrl,
  bio,
  specialties,
  locations,
}: PhotographerSectionProps) {
  return (
    <section className='bg-black-1 fixed top-[5rem] z-10 w-full max-w-[45rem] p-[2rem]'>
      <div className='flex gap-[1.2rem]'>
        {/* 프로필 이미지 */}
        <div className='relative h-[8.7rem] w-[8.7rem]'>
          <Image
            src={imageUrl || '/imgs/default-profile.png'}
            alt='프로필 이미지'
            fill
            className='rounded-full object-cover'
          />
        </div>
        {/* 작가 정보 */}
        <div className='flex flex-1 flex-col gap-[0.9rem]'>
          <div className='flex flex-col gap-[0.2rem]'>
            <h2 className='font-16-bd text-black-10'>{name}</h2>
            <p className='caption-14-rg text-black-8'>{bio}</p>
          </div>
          <dl className='flex flex-col gap-[0.4rem]'>
            <DetailRow label='촬영 상품' content={specialties} />
            <DetailRow label='활동 지역' content={locations} />
          </dl>
        </div>
      </div>
    </section>
  );
}

function DetailRow({ label, content }: DetailRowProps) {
  return (
    <div className='flex gap-[0.8rem]'>
      <dt className='caption-12-md text-black-7'>{label}</dt>
      <dd className='caption-12-md text-black-9'>{content.join(', ')}</dd>
    </div>
  );
}

export const PhotographerSectionSkeleton = () => {
  return (
    <section className='fixed-center bg-black-1 top-[5rem] z-10 flex gap-[1.2rem] p-[2rem]'>
      <div className='bg-black-3 h-[8.7rem] w-[8.7rem] rounded-full' />
      <div className='flex flex-col gap-[0.9rem]'>
        <div className='flex flex-col gap-[0.4rem]'>
          <div className='bg-black-3 h-[2.2rem] w-[4.5rem] rounded-[0.2rem]' />
          <div className='bg-black-3 h-[2.2rem] w-[13.2rem] rounded-[0.2rem]' />
        </div>
        <div className='flex flex-col gap-[0.4rem]'>
          <div className='bg-black-3 h-[1.2rem] w-[15.8rem] rounded-[0.2rem]' />
          <div className='bg-black-3 h-[1.2rem] w-[3.7rem] rounded-[0.2rem]' />
        </div>
      </div>
    </section>
  );
};
