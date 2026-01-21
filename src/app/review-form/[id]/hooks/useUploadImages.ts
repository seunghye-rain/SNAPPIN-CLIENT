import { useState } from 'react';
import { useImageUpload } from '../api';

type UploadState = 'idle' | 'uploading' | 'success' | 'error';

export const useUploadImages = () => {
  const { mutateAsync: requestPresignedUrl } = useImageUpload();
  const [uploadState, setUploadState] = useState<UploadState>('idle');

  const uploadSingleImage = async (file: File): Promise<string> => {
    const safeFileName = encodeURIComponent(file.name);

    const { uploadUrl, s3Key } = await requestPresignedUrl({
      fileName: safeFileName,
      contentType: file.type,
    });

    if (!uploadUrl || !s3Key) {
      throw new Error('Invalid presigned url response');
    }

    await fetch(uploadUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': file.type,
      },
      body: file,
    });

    return s3Key;
  };

  const uploadImages = async (files: File[]): Promise<string[]> => {
    if (files.length === 0) return [];

    try {
      setUploadState('uploading');

      const s3Keys = await Promise.all(files.map((file) => uploadSingleImage(file)));

      setUploadState('success');
      return s3Keys;
    } catch (error) {
      setUploadState('error');
      throw error;
    }
  };

  return {
    uploadImages,
    uploadState,
    isUploading: uploadState === 'uploading',
  };
};
