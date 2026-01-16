'use client';

import { useState } from 'react';
import { TextareaField, FieldMessage } from '@/ui';

const REVIEW_CONTENT_MAX_LENGTH = 500;

export default function ReviewFormSection({ initialContent = '' }) {
  const [content, setContent] = useState(initialContent);
  const isError = content.length > REVIEW_CONTENT_MAX_LENGTH;

  return (
    <section className='bg-black-1 flex flex-col px-[2rem]'>
      <TextareaField
        id='review-form'
        label='자세한 스냅 촬영 리뷰를 작성해주세요'
        placeholder='스냅 촬영의 분위기와 결과물을 자세히 작성해 주시면 유용한 리뷰가 돼요'
        value={content}
        hasError={isError}
        className='min-h-[11rem]'
        helpText={
          <div className='flex flex-row justify-between'>
            <FieldMessage
              id='review-form-error'
              message={isError ? `최대 ${REVIEW_CONTENT_MAX_LENGTH}자까지 입력할 수 있어요` : ' '}
              variant={isError ? 'error' : 'help'}
            />
            <FieldMessage
              id='review-form-help'
              message={`(${content.length}/${REVIEW_CONTENT_MAX_LENGTH})`}
              variant={isError ? 'error' : 'help'}
            />
          </div>
        }
        onChange={(e) => setContent(e.target.value)}
      />
    </section>
  );
}
