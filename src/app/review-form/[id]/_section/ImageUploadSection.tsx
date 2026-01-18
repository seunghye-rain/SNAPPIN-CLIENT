'use client';

import { useState } from 'react';
import { ImageUploadButton, ImagePreview } from '@/ui';
import { IMAGE_ACCEPT } from '@/constants/image-type/imageAccept';
import { cn } from '@/utils/cn';

type ImageUploadSectionProps = {
  imageUrls: string[];
  handleChangeImageUrls: (urls: string[]) => void;
  validateFiles: (files: FileList) => { ok: boolean };
  errorMessage?: string;
};

const MAX_IMAGE_COUNT = 5;

export default function ImageUploadSection({
  imageUrls,
  handleChangeImageUrls,
  validateFiles,
}: ImageUploadSectionProps) {
  const [isError, setIsError] = useState(false);
  const [previews, setPreviews] = useState<{ file: File; url: string }[]>([]);

  const handleUploadClick = (selected: FileList) => {
    const result = validateFiles(selected);
    if (!result.ok) {
      setIsError(true);
      return;
    }
    setIsError(false);

    const selectedFiles = Array.from(selected);
    const newPreviews = selectedFiles.map((file) => ({ file, url: URL.createObjectURL(file) }));
    const mergedPreviews = [...previews, ...newPreviews].slice(0, MAX_IMAGE_COUNT);
    const mergedUrls = [...imageUrls, ...newPreviews.map(({ url }) => url)].slice(
      0,
      MAX_IMAGE_COUNT,
    );

    setPreviews(mergedPreviews);
    handleChangeImageUrls(mergedUrls);
  };

  const handleImageRemove = (targetUrl: string) => {
    setPreviews((prev) => {
      const removed = prev.find(({ url }) => url === targetUrl);
      if (removed) URL.revokeObjectURL(removed.url);
      return prev.filter(({ url }) => url !== targetUrl);
    });
    handleChangeImageUrls(imageUrls.filter((url) => url !== targetUrl));
  };

  return (
    <section className='flex flex-col gap-[1.2rem] px-[2rem] pt-[1rem]'>
      {previews.length > 0 && (
        <div className='scrollbar-hide mt-[1.2rem] -mr-[2rem] flex gap-[0.8rem] overflow-x-auto pr-[2rem]'>
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

      <ImageUploadButton handleUploadAction={handleUploadClick} accept={IMAGE_ACCEPT.WITH_HEIC} />

      <p className={cn('caption-12-md', isError ? 'text-red-error' : 'text-black-6')}>
        20MB 이하의 JPG, PNG, HEIC, WEBP 이미지로 최대 5장까지 업로드가 가능합니다.
      </p>
      {previews.length > 0 && <div className='h-[8.4rem]' />}
    </section>
  );
}
