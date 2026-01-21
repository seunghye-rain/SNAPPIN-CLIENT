import { useCallback, useEffect, useState } from 'react';

type ImageItem = {
  file: File;
  previewUrl: string;
};

export const useImageSelection = () => {
  const [images, setImages] = useState<ImageItem[]>([]);

  /**
   * 이미지 추가 (중복 선택 시 토글 제거)
   */
  const addImage = useCallback((file: File) => {
    setImages((prev) => {
      const exists = prev.find(
        (item) => item.file.name === file.name && item.file.lastModified === file.lastModified,
      );

      // 이미 있으면 제거 (토글)
      if (exists) {
        URL.revokeObjectURL(exists.previewUrl);
        return prev.filter((item) => item !== exists);
      }

      // 없으면 추가
      return [
        ...prev,
        {
          file,
          previewUrl: URL.createObjectURL(file),
        },
      ];
    });
  }, []);

  /**
   * previewUrl 기준 이미지 제거
   */
  const removeImage = useCallback((previewUrl: string) => {
    setImages((prev) => {
      const target = prev.find((item) => item.previewUrl === previewUrl);

      if (target) {
        URL.revokeObjectURL(target.previewUrl);
      }

      return prev.filter((item) => item.previewUrl !== previewUrl);
    });
  }, []);

  /**
   * 업로드용 File 배열
   */
  const files = images.map((item) => item.file);

  /**
   * 컴포넌트 언마운트 시 ObjectURL 정리
   */
  useEffect(() => {
    return () => {
      images.forEach((item) => {
        URL.revokeObjectURL(item.previewUrl);
      });
    };
  }, [images]);

  return {
    images, // [{ file, previewUrl }]
    files, // File[]
    addImage, // (file: File) => void
    removeImage, // (previewUrl: string) => void
  };
};
