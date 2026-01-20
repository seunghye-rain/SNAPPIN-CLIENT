'use client';

import { useState } from 'react';
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
import { useImageUpload, useSubmitReview } from '../api';

type ReviewFormSectionProps = {
  reservationId: number;
};

type PreviewItem = { file: File; url: string; s3Key?: string };
type IssuedImage = { uploadUrl: string; imageUrl: string; s3Key?: string };
type NormalizedIssued = { uploadUrl: string; imageUrl: string; s3Key?: string };

const toNormalizedIssued = ({ uploadUrl = '', imageUrl = '', s3Key }: NormalizedIssued) => ({
  uploadUrl,
  imageUrl,
  s3Key,
});

export default function ReviewFormSection({ reservationId }: ReviewFormSectionProps) {
  const {
    compatibleFormData,
    compatibleErrors,
    isValid,
    updateRating,
    updateContent,
    updateImageUrls,
    validateFiles,
    handleSubmitForm,
  } = useReviewWrite();

  const [previews, setPreviews] = useState<PreviewItem[]>([]);
  const router = useRouter();

  const [issuedImages, setIssuedImages] = useState<IssuedImage[]>([]);
  const uploadImageMutation = useImageUpload();
  const { mutate: submitReviewMutation } = useSubmitReview();

  const handleSubmit = () => {
    handleSubmitForm((review) => {
      submitReviewMutation({
        reservationId: reservationId,
        rating: review.rating,
        content: review.content,
        imageUrls: review?.imageUrls,
      });
      router.replace(`/photo-final-detail/${reservationId}`);
      console.log(review);
    });
  };

  const scrollImagesToEnd = () => {
    const el = document.getElementById('review-image-list');
    if (!el) return;

    el.scrollTo({ left: el.scrollWidth, behavior: 'smooth' });

    const rect = el.getBoundingClientRect();
    const y = rect.top + window.scrollY - 50;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  const handleUploadClick = async (selected: FileList) => {
    const validation = validateFiles(selected, compatibleFormData.imageUrls.length);
    if (!validation.ok) return;

    const selectedFiles = Array.from(selected);
    requestAnimationFrame(scrollImagesToEnd);

    try {
      const issuedWithPreview = await Promise.all(
        selectedFiles.map(async (file) => {
          const issued = await uploadImageMutation.mutateAsync({
            fileName: file.name,
            contentType: file.type,
          });

          const key = issued.s3Key ?? issued.imageUrl ?? '';

          return {
            issued,
            preview: { file, url: URL.createObjectURL(file), s3Key: key || undefined },
            key,
          };
        }),
      );

      const normalizedIssued: NormalizedIssued[] = issuedWithPreview.map(({ issued }) =>
        toNormalizedIssued(issued),
      );

      setIssuedImages((prev) => [...prev, ...normalizedIssued]);

      const issuedKeys = issuedWithPreview
        .map(({ key }) => key)
        .filter((key): key is string => Boolean(key));

      const mergedPreviews = [
        ...previews,
        ...issuedWithPreview.map(({ preview }) => preview),
      ].slice(0, MAX_IMAGE_COUNT);
      const mergedUrls = [...compatibleFormData.imageUrls, ...issuedKeys].slice(0, MAX_IMAGE_COUNT);

      setPreviews(mergedPreviews);
      updateImageUrls(mergedUrls);
    } catch (error) {
      console.error('Presigned URL 발급 실패:', error);
    }
  };

  const handleImageRemove = (targetUrl: string) => {
    setPreviews((prev) => {
      const removed = prev.find(({ url }) => url === targetUrl);
      if (removed) URL.revokeObjectURL(removed.url);
      return prev.filter(({ url }) => url !== targetUrl);
    });

    const removeKey =
      issuedImages.find((image) => image.imageUrl === targetUrl || image.s3Key === targetUrl)
        ?.s3Key ?? targetUrl;

    setIssuedImages((prev) =>
      prev.filter((image) => (image.s3Key ?? image.imageUrl) !== removeKey),
    );

    updateImageUrls(compatibleFormData.imageUrls.filter((url) => url !== removeKey));
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
            handleUploadAction={handleUploadClick}
            accept={IMAGE_ACCEPT.WITH_HEIC}
          />

          <p className={cn('caption-12-md', hasImageError ? 'text-red-error' : 'text-black-6')}>
            20MB 이하의 JPG, PNG, HEIC, WEBP 이미지로 최대 5장까지 업로드가 가능합니다.
          </p>
        </section>

        <div className='pb-[10rem]' />
      </form>

      <ClientFooter disabled={!isValid || isContentEmpty} handleClick={handleSubmit} />
    </>
  );
}
