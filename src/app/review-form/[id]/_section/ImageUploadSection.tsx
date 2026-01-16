'use client';

import { useState } from 'react';
import { ImageUploadButton, ImagePreview, Carousel, CarouselContent, CarouselItem } from '@/ui';
import { IMAGE_ACCEPT } from '@/utils/imageAccept';

const MAX_IMAGE_COUNT = 5;
const ALLOWED_TYPES = IMAGE_ACCEPT.WITH_HEIC.split(',');

export default function ImageUploadSection() {
  const [files, setFiles] = useState<File[]>([]);
  const [isError, setIsError] = useState(false);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const handleUploadClick = (selected: FileList) => {
    const selectedFiles = Array.from(selected);
    const hasInvalidType = selectedFiles.some((file) => !ALLOWED_TYPES.includes(file.type));
    const exceedsMax = selectedFiles.length > MAX_IMAGE_COUNT;
    const urls = Array.from(selected).map((file) => URL.createObjectURL(file));

    if (hasInvalidType || exceedsMax) {
      setIsError(true);
      setFiles([]);
      return;
    }

    setPreviewUrls(urls);
    setIsError(false);
    setFiles(selectedFiles);
  };

  const handleReviewImageRemove = (url: string) => {
    setPreviewUrls((prev) => prev.filter((item) => item !== url));
  };

  return (
    <section className='flex flex-col gap-[1.2rem] px-[2rem] pt-[1rem]'>
      {previewUrls.length >= 2 ? (
        <div className='mt-[1.2rem] -mr-[2.4rem]'>
          <Carousel opts={{ align: 'start', dragFree: true, containScroll: 'trimSnaps' }}>
            <CarouselContent className='ml-0 gap-[0.4rem]'>
              {previewUrls.map((url) => (
                <CarouselItem key={url} className='basis-[14rem] pl-0'>
                  <ImagePreview
                    imageSrc={url}
                    imageAlt='업로드한 리뷰 이미지'
                    showRemoveButton={true}
                    handleRemove={() => handleReviewImageRemove(url)}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      ) : (
        previewUrls.length === 1 && (
          <div className='mt-[1.2rem]'>
            <ImagePreview
              imageSrc={previewUrls[0]}
              imageAlt='업로드한 리뷰 이미지'
              showRemoveButton={true}
              handleRemove={() => handleReviewImageRemove(previewUrls[0])}
            />
          </div>
        )
      )}
      <ImageUploadButton handleUploadAction={handleUploadClick} accept={IMAGE_ACCEPT.WITH_HEIC} />
      <p className={`caption-12-md ${isError ? 'text-red-error' : 'text-black-6'}`}>
        20MB 이하의 JPG, PNG, HEIC, WEBP 이미지로 최대 5장까지 업로드가 가능합니다.
      </p>
      {previewUrls.length > 0 && <div className='h-[8.4rem]' />}
    </section>
  );
}
