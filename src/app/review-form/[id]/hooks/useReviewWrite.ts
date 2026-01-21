'use client';

import { useState } from 'react';
import { z } from 'zod';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import validateImage from '@/utils/validateImage';
import { IMAGE_ACCEPT, MAX_IMAGE_SIZE } from '@/constants/image-type/imageAccept';

export const REVIEW_CONTENT_MAX_LENGTH = 500;
export const MAX_RATING = 5;
export const MAX_IMAGE_COUNT = 5;

// 검증 결과 타입
type ContentValidationResult = { ok: boolean; reason?: 'min' | 'max' };
type QueueResult = { ok: boolean; message?: string };
type UploadImagesHandler = (
  files: File[],
) => Promise<{ ok: boolean; imageUrls?: string[]; message?: string }>;

const ALLOWED_TYPES = new Set(IMAGE_ACCEPT.WITH_HEIC.split(','));

// 리뷰 작성 폼 스키마
export const enrollReviewSchema = z.object({
  rating: z.number().min(1, '별점을 선택해 주세요.').max(MAX_RATING),
  content: z
    .string()
    .trim()
    .min(0)
    .max(REVIEW_CONTENT_MAX_LENGTH, `최대 ${REVIEW_CONTENT_MAX_LENGTH}자까지 입력할 수 있어요.`),
  imageUrls: z.array(z.string()).max(MAX_IMAGE_COUNT),
});

// 리뷰 작성 폼 입력 타입
export type EnrollReviewInput = z.infer<typeof enrollReviewSchema>;

// 리뷰 작성 훅
export const useReviewWrite = () => {
  const {
    control,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    trigger,
    formState: { errors, isValid },
  } = useForm<EnrollReviewInput>({
    resolver: zodResolver(enrollReviewSchema),
    defaultValues: { rating: 0, content: '', imageUrls: [] },
    mode: 'onChange',
  });

  // 폼 데이터 감시
  const [rating, content, imageUrls] = useWatch({
    control,
    name: ['rating', 'content', 'imageUrls'],
  });

  // 대기 중인 이미지 파일 상태
  const [queuedFiles, setQueuedFiles] = useState<File[]>([]);

  // 별점 업데이트 함수
  const updateRating = (value: number) => {
    setValue('rating', value, { shouldValidate: true });
  };

  // 리뷰 내용 업데이트 함수
  const updateContent = (value: string): ContentValidationResult => {
    const isOverMax = value.length > REVIEW_CONTENT_MAX_LENGTH;
    setValue('content', value, { shouldValidate: true });

    if (isOverMax) {
      setError('content', { message: `최대 ${REVIEW_CONTENT_MAX_LENGTH}자까지 입력할 수 있어요.` });
      return { ok: false, reason: 'max' };
    }

    clearErrors('content');
    return { ok: true };
  };

  // 이미지 파일 큐잉 함수
  const queueImages = (files: FileList | File[]): QueueResult => {
    const selected = files instanceof FileList ? Array.from(files) : files;

    const failed = selected
      .map((file, index) =>
        validateImage({
          file,
          currentCount: imageUrls.length + queuedFiles.length + index,
          maxImageCount: MAX_IMAGE_COUNT,
          allowedTypes: ALLOWED_TYPES,
          maxImageSize: MAX_IMAGE_SIZE,
        }),
      )
      .find((result) => !result.ok);

    if (failed && failed.message) {
      setError('imageUrls', { message: failed.message });
      return { ok: false, message: failed.message };
    }

    clearErrors('imageUrls');
    setQueuedFiles((prev) => [...prev, ...selected].slice(0, MAX_IMAGE_COUNT - imageUrls.length));
    return { ok: true };
  };

  // 이미지 파일 제거 함수
  const removeQueuedImage = (targetName: string) => {
    setQueuedFiles((prev) => prev.filter((file) => file.name !== targetName));
  };

  // 서버에 업로드된 이미지 URL 설정 함수
  const setServerImageUrls = (urls: string[]) => {
    setValue('imageUrls', urls.slice(0, MAX_IMAGE_COUNT), { shouldValidate: true });
    clearErrors('imageUrls');
  };

  // 폼 제출 처리 함수
  const handleSubmitForm = async (
    uploadImages: UploadImagesHandler,
    onValid: (data: EnrollReviewInput) => void,
  ) => {
    const ok = await trigger();
    if (!ok) return;

    try {
      const uploadResult = await uploadImages(queuedFiles);
      if (!uploadResult.ok || !uploadResult.imageUrls) {
        if (uploadResult.message) setError('imageUrls', { message: uploadResult.message });
        return;
      }

      setServerImageUrls(uploadResult.imageUrls);
      setQueuedFiles([]);

      handleSubmit((data) => onValid({ ...data, imageUrls: uploadResult.imageUrls }))();
    } catch {
      setError('imageUrls', { message: '이미지 업로드에 실패했어요. 다시 시도해 주세요.' });
    }
  };

  const compatibleErrors = {
    rating: errors.rating?.message,
    content: errors.content?.message,
    imageUrls: errors.imageUrls?.message,
  };

  const compatibleFormData = {
    rating,
    content,
    imageUrls,
    queuedFiles,
  };

  return {
    formData: compatibleFormData,
    compatibleFormData,
    isValid,
    handleSubmitForm,
    updateRating,
    updateContent,
    queueImages,
    removeQueuedImage,
    setServerImageUrls,
    compatibleErrors,
  };
};
