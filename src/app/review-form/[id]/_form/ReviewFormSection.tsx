'use client';

import { useRouter } from 'next/navigation';
import { FieldMessage, ImagePreview, TextareaField } from '@/ui';
import ImageUploadButton from '@/ui/button/upload/ImageUploadButton';
import { cn } from '@/utils/cn';
import ClientFooter from '../components/client-footer/ClientFooter';
import {
  MAX_IMAGE_COUNT,
  MAX_RATING,
  REVIEW_CONTENT_MAX_LENGTH,
  useReviewWrite,
} from '../hooks/useReviewWrite';
import { IMAGE_ACCEPT } from '@/constants/image-type/imageAccept';
import { StarRating } from '../components';
import { useSubmitReview } from '../api';
import { useUploadImages } from '../hooks/useUploadImages';
import { useImageSelection } from '../hooks/useImageSelection';
import validateImage from '@/utils/validateImage';

type ReviewFormSectionProps = {
  reservationId: number;
};

export default function ReviewFormSection({ reservationId }: ReviewFormSectionProps) {
  const {
    compatibleFormData,
    compatibleErrors,
    isValid,
    updateRating,
    updateContent,
    handleSubmitForm,
  } = useReviewWrite();

  const { images, addImage, removeImage, files } = useImageSelection();

  const { uploadImages, isUploading } = useUploadImages();
  const { mutateAsync: submitReview } = useSubmitReview();
  const router = useRouter();

  const handleUploadAction = (fileList: FileList) => {
    Array.from(fileList).forEach((file) => {
      const { ok } = validateImage({
        file,
        currentCount: images.length,
        maxImageCount: MAX_IMAGE_COUNT,
      });

      if (!ok) return;

      addImage(file);
    });
  };

  const handleSubmit = async () => {
    handleSubmitForm(async (formData) => {
      try {
        // 1. 이미지 업로드 (선택된 파일들)
        const imageUrls = await uploadImages(files);

        // 2. 리뷰 등록
        await submitReview({
          reservationId,
          rating: formData.rating,
          content: formData.content,
          imageUrls,
        });

        // 3. 성공 시 이동
        router.replace(`/photo-final-detail/${reservationId}`);
      } catch (error) {
        // TODO: 실패 UX (toast, alert 등)
        console.error(error);
      }
    });
  };

  const hasContentError = Boolean(compatibleErrors.content);
  const hasImageError = Boolean(compatibleErrors.imageUrls);
  const isContentEmpty = compatibleFormData.content.trim().length < 1;

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <section className='flex flex-col gap-[0.8rem] p-[2.4rem_2rem_2.8rem_2rem]'>
          <span className='caption-14-md text-black-10'>이번 촬영은 어떠셨나요?</span>
          <StarRating
            maxLength={MAX_RATING}
            value={compatibleFormData.rating}
            onChange={updateRating}
          />
        </section>

        <section className='flex flex-col px-[2rem]'>
          <TextareaField
            id='review-form'
            label='자세한 스냅 촬영 리뷰를 작성해주세요'
            placeholder={
              '스냅 촬영의 분위기와 결과물에 대해\n자세히 작성해 주시면 유용한 리뷰가 돼요'
            }
            value={compatibleFormData.content}
            hasError={hasContentError}
            className='min-h-[11rem]'
            helpText={
              <div className='flex justify-between'>
                <FieldMessage
                  id='review-form-error'
                  message={compatibleErrors.content ?? ' '}
                  variant={hasContentError ? 'error' : 'help'}
                />
                <FieldMessage
                  id='review-form-help'
                  message={`(${compatibleFormData.content.length}/${REVIEW_CONTENT_MAX_LENGTH})`}
                  variant={hasContentError ? 'error' : 'help'}
                />
              </div>
            }
            onChange={(e) => updateContent(e.target.value)}
          />
        </section>

        <section className='mt-[1.2rem] flex flex-col gap-[1.2rem] px-[2rem]'>
          {images.length > 0 && (
            <div className='scrollbar-hide -mr-[1.4rem] flex gap-[0.8rem] overflow-x-auto pr-[2rem]'>
              {images.map(({ previewUrl }) => (
                <ImagePreview
                  key={previewUrl}
                  imageSrc={previewUrl}
                  imageAlt='업로드한 리뷰 이미지'
                  showRemoveButton
                  handleRemove={() => removeImage(previewUrl)}
                  className='shrink-0'
                />
              ))}
            </div>
          )}

          <ImageUploadButton
            handleUploadAction={handleUploadAction}
            accept={IMAGE_ACCEPT.WITH_HEIC}
          />

          <p className={cn('caption-12-md', hasImageError ? 'text-red-error' : 'text-black-6')}>
            20MB 이하의 JPG, PNG, HEIC, WEBP 이미지로 최대 5장까지 업로드가 가능합니다.
          </p>
          <div className='bg-black-1 h-[10rem] w-full' />
        </section>
      </form>

      <ClientFooter
        disabled={!isValid || isContentEmpty || isUploading}
        handleClick={handleSubmit}
      />
    </>
  );
}
