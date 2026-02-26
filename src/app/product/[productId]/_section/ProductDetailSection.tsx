import { TagChip, Divider } from '@/ui';
import { MoodCode } from '@/types/moodCode';
import { GetProductInfoResponse } from '@/swagger-api/data-contracts';

type ProductDetailSectionProps = {
  productInfo: GetProductInfoResponse | undefined;
};

function removeEmptyDetail(items: { label: string, content?: string }[]) {
  return items.filter((item): item is { label: string; content: string } => item.content !== null);
}

export default function ProductDetailSection({ productInfo }: ProductDetailSectionProps) {
  const data = {
    snapCategory: productInfo?.snapCategory ?? '-',
    regions: productInfo?.regions ?? [],
    moods: productInfo?.moods as MoodCode[] ?? [],
    maxPeople: productInfo?.maxPeople ?? '-',
    photographerCount: productInfo?.photographerCount ?? '-',
    durationTime: productInfo?.durationTime ?? '-',
    provideRaw: productInfo?.provideRaw,
    provideOriginalJpg: productInfo?.provideOriginalJpg,
    originalJpgCount: productInfo?.originalJpgCount,
    originalDeliveryTime: productInfo?.originalDeliveryTime,
    provideVideo: productInfo?.provideVideo,
    freeRevisionCount: productInfo?.freeRevisionCount,
    finalCutCount: productInfo?.finalCutCount,
    finalDeliveryTime: productInfo?.finalDeliveryTime,
    description: productInfo?.description,
    processDescription: productInfo?.processDescription,
    equipment: productInfo?.equipment,
    caution: productInfo?.caution,
  };

  const optionalDetailList = removeEmptyDetail([
    { label: 'RAW 파일 제공 여부', content: data.provideRaw },
    { label: '원본 JPG 제공 여부', content: data.provideOriginalJpg },
    { label: '원본 JPG 제공 장수', content: data.originalJpgCount },
    { label: '원본 제공 시점', content: data.originalDeliveryTime },
    { label: '동영상 제공 여부', content: data.provideVideo },
    { label: '무료 수정 횟수', content: data.freeRevisionCount },
    { label: '최종 결과물 제공 장수', content: data.finalCutCount },
    { label: '최종 결과물 전달 소요시간', content: data.finalDeliveryTime },
  ]);

  return (
    <section className='bg-black-1 mb-[7.4rem] flex flex-col gap-[3.2rem] p-[2rem]'>
      <div className='flex flex-col gap-[1.2rem]'>
        {/* 첫번째 박스 - 촬영 종류, 촬영 장소, 스냅 무드 */}
        <div className='border-black-4 flex flex-col gap-[1.2rem] rounded-[0.6rem] border-1 p-[1.6rem]'>
          <div className='flex gap-[1rem]'>
            <span className='caption-12-md text-black-7 w-[8rem]'>촬영 종류</span>
            <span className='caption-12-md text-black-10'>{data.snapCategory}</span>
          </div>
          <div className='flex gap-[1rem]'>
            <span className='caption-12-md text-black-7 w-[8rem]'>촬영 장소</span>
            <span className='caption-12-md text-black-10'>{data.regions.join(', ')}</span>
          </div>
          <div className='flex items-center gap-[1rem]'>
            <span className='caption-12-md text-black-7 w-[8rem]'>스냅 무드</span>
            <div className='flex items-center gap-[0.4rem]'>
              {data.moods.map((mood) => (
                <TagChip key={mood} variant='neon' label={mood} />
              ))}
            </div>
          </div>
        </div>
        {/* 두번째 박스 - 최대 촬영 인원 ~ 최종 결과물 전달 소요시간 */}
        <div className='border-black-4 flex flex-col gap-[1rem] rounded-[0.6rem] border-1 p-[2rem]'>
          <div className='flex flex-col gap-[1.2rem]'>
            {/* 필수 항목 */}
            <DetailLayout
              detailList={[
                { label: '최대 촬영 인원', content: `${data.maxPeople}` },
                { label: '촬영 작가 인원', content: `${data.photographerCount}` },
                { label: '촬영 시간', content: `${data.durationTime}` },
              ]}
            />
            {/* 선택 항목 */}
            {optionalDetailList.length > 0 && (
              <>
                <Divider thickness='small' color='bg-black-5' className='w-full' />
                <DetailLayout detailList={optionalDetailList} />
              </>
            )}
          </div>
        </div>
      </div>
      <DetailParagraph label='상품 소개' content={data.description ?? '-'} />
      <DetailParagraph label='촬영 진행 순서' content={data.processDescription ?? '-'} />
      <DetailParagraph label='사용장비' content={data.equipment ?? '-'} />
      <DetailParagraph label='기타 주의 사항' content={data.caution ?? '-'} />
    </section>
  );
}

function DetailLayout({ detailList }: { detailList: { label: string, content?: string }[] }) {
  return (
    <div className='flex flex-col gap-[0.8rem]'>
      {detailList.map((detail) => (
        <div key={detail.label} className='flex gap-[4rem]'>
          <span className='caption-12-md text-black-7 w-[12.2rem]'>{detail.label}</span>
          <span className='caption-12-md text-black-10'>{detail.content}</span>
        </div>
      ))}
    </div>
  );
}

function DetailParagraph({ label, content }: { label: string; content: string }) {
  return (
    <div className='flex flex-col gap-[0.6rem]'>
      <span className='caption-12-md text-black-7'>{label}</span>
      <p className='caption-14-rg text-black-10 whitespace-pre-line'>{content}</p>
    </div>
  );
}
