import { DetailLayout } from '../components/detail-layout/DetailLayout';
import { Divider } from '@/ui';

export default function SectionSkeleton() {
  return (
    <div>
     <DetailLayout title='예약 상세' >
      <div className='flex flex-col gap-[1.5rem]'>
        <div className='flex flex-col gap-[0.4rem]'>
          <div className='flex items-center gap-[0.2rem]'>
            <div className='w-[2.4rem] h-[2.4rem]  bg-black-3' />
          </div>
          <div className='w-[4.8rem] h-[1.6rem] bg-black-3' />
        </div>
        <Divider thickness='small' color='bg-black-5' />
      </div>
      <div className='w-[10rem] h-[1.6rem] bg-black-3' />
      <div className='w-[10rem] h-[1.6rem] bg-black-3' />
      <div className='w-[10rem] h-[1.6rem] bg-black-3' />
      <div className='w-[10rem] h-[1.6rem] bg-black-3' />
      <div className='w-[10rem] h-[1.6rem] bg-black-3' />
    </DetailLayout>
    <Divider thickness='large' color='bg-black-3' />
    <DetailLayout title='예약 상세' >
      <div className='flex flex-col gap-[1.5rem]'>
        <div className='flex flex-col gap-[0.4rem]'>
          <div className='flex items-center gap-[0.2rem]'>
            <div className='w-[2.4rem] h-[2.4rem]  bg-black-3' />
          </div>
          <div className='w-[4.8rem] h-[1.6rem] bg-black-3' />
        </div>
        <Divider thickness='small' color='bg-black-5' />
      </div>
      <div className='w-[10rem] h-[1.6rem] bg-black-3' />
      <div className='w-[10rem] h-[1.6rem] bg-black-3' />
      <div className='w-[10rem] h-[1.6rem] bg-black-3' />
      <div className='w-[10rem] h-[1.6rem] bg-black-3' />
      <div className='w-[10rem] h-[1.6rem] bg-black-3' />
    </DetailLayout>
    </div>
  )
}
