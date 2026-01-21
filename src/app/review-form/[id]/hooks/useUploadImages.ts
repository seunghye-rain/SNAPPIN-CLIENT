import { useState, useEffect } from 'react';
import { useImageUpload } from '../api';
import { MAX_IMAGE_COUNT } from './useReviewWrite';

// 이미지 업로드 결과 타입
type UploadImagesResult = { ok: true; imageUrls: string[] } | { ok: false; message: string };
type PreviewItem = { file: File; url: string };

// 이미지 업로드 훅
export const useUploadImages = () => {
  const uploadImageMutation = useImageUpload();
  const [isUploading, setIsUploading] = useState(false);

  // 이미지 업로드 함수
  const uploadImages = async (files: File[]): Promise<UploadImagesResult> => {
    if (files.length === 0) return { ok: true, imageUrls: [] };

    setIsUploading(true);
    try {
      const presignedList = await Promise.all(
        files.map((file) =>
          uploadImageMutation.mutateAsync({ fileName: file.name, contentType: file.type }),
        ),
      );

      // 업로드 대상과 파일 매핑
      const uploadTargets = presignedList.map((item, index) => {
        if (!item.uploadUrl) throw new Error('presigned URL이 없습니다.');
        return { uploadUrl: item.uploadUrl, file: files[index] };
      });

      await Promise.all(
        uploadTargets.map(({ uploadUrl, file }) =>
          fetch(uploadUrl, {
            method: 'PUT',
            headers: { 'Content-Type': file.type },
            body: file,
          }),
        ),
      );

      // 업로드된 이미지 URL 추출
      const imageUrls = presignedList
        .map(({ s3Key, imageUrl }) => s3Key ?? imageUrl ?? '')
        .filter((url): url is string => Boolean(url))
        .slice(0, MAX_IMAGE_COUNT);

      return { ok: true, imageUrls };
    } catch {
      return { ok: false, message: '이미지 업로드에 실패했어요. 다시 시도해 주세요.' };
    } finally {
      setIsUploading(false);
    }
  };

  return { uploadImages, isUploading };
};

// 이미지 미리보기 훅
export const useImagePreviews = () => {
  const [previews, setPreviews] = useState<PreviewItem[]>([]);

  const addFiles = (files: File[], limit?: number) => {
    const next = [...previews, ...files.map((file) => ({ file, url: URL.createObjectURL(file) }))];
    const limited = typeof limit === 'number' ? next.slice(0, limit) : next;
    setPreviews(limited);
    return limited;
  };

  const removeByUrl = (targetUrl: string) => {
    setPreviews((prev) => {
      const remaining = prev.filter(({ url }) => url !== targetUrl);
      const removed = prev.find(({ url }) => url === targetUrl);
      if (removed) URL.revokeObjectURL(removed.url);
      return remaining;
    });
  };

  const clear = () => {
    previews.forEach(({ url }) => URL.revokeObjectURL(url));
    setPreviews([]);
  };

  useEffect(() => () => clear(), []); // 언마운트 시 정리

  return { previews, addFiles, removeByUrl, clear };
};
