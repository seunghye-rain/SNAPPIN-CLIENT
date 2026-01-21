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
import { useUploadImages, useImagePreviews } from '../hooks/useUploadImages';

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
    queueImages,
    removeQueuedImage,
    handleSubmitForm,
  } = useReviewWrite();

  const { uploadImages, isUploading } = useUploadImages();
  const { previews, addFiles, removeByUrl, clear } = useImagePreviews();
  const { mutate: submitReviewMutation } = useSubmitReview();
  const router = useRouter();

  const handleUpdateImageUrls = (selected: FileList) => {
    const files = Array.from(selected);
    const validation = queueImages(files);
    if (!validation.ok) return;

    const remainingSlots =
      MAX_IMAGE_COUNT - compatibleFormData.imageUrls.length - compatibleFormData.queuedFiles.length;
    if (remainingSlots < 1) return;

    addFiles(files.slice(0, remainingSlots), MAX_IMAGE_COUNT);
  };

  const handleImageRemove = (targetUrl: string) => {
    const target = previews.find(({ url }) => url === targetUrl);
    if (!target) return;
    removeByUrl(targetUrl);
    removeQueuedImage(target.file.name);
  };

  const handleSubmit = () => {
    handleSubmitForm(uploadImages, (review) => {
      submitReviewMutation({
        reservationId,
        rating: review.rating,
        content: review.content,
        imageUrls: review.imageUrls,
      });
      clear();
      router.replace(`/photo-final-detail/${reservationId}`);
    });
  };

  const hasContentError = Boolean(compatibleErrors.content);
  const hasImageError = Boolean(compatibleErrors.imageUrls);
  const isContentEmpty = compatibleFormData.content.trim().length < 1;

  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
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
              <div className='flex flex-row justify-between'>
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
            onChange={(event) => updateContent(event.target.value)}
          />
        </section>

        <section className='mt-[1.2rem] flex flex-col gap-[1.2rem] px-[2rem]'>
          {previews.length > 0 && (
            <div
              id='review-image-list'
              className='scrollbar-hide -mr-[1.4rem] flex gap-[0.8rem] overflow-x-auto pr-[2rem]'
            >
              {previews.map(({ url }) => (
                <ImagePreview
                  key={url}
                  imageSrc={url}
                  imageAlt='업로드한 리뷰 이미지'
                  showRemoveButton
                  handleRemove={() => handleImageRemove(url)}
                  className='shrink-0'
                />
              ))}
            </div>
          )}

          <ImageUploadButton
            handleUploadAction={handleUpdateImageUrls}
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
