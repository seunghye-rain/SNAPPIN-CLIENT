'use client';

import { cn } from '@snappin/design-system/lib';
import { LikeButton } from '@snappin/design-system';
import { useAuth } from '@/auth/hooks/useAuth';
import { useWishProduct } from '@/queries/product';
import { useToast } from '@/ui';

type ProductClientProps = {
  id: number;
  isLiked: boolean;
};

export default function ProductClient({ id, isLiked }: ProductClientProps) {
  const { isLogIn } = useAuth();
  const { error } = useToast();
  const { mutate: wishProduct } = useWishProduct();

  const handleLike = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    e?.stopPropagation();

    if (!isLogIn) {
      error('로그인이 필요한 기능입니다.', undefined, 'bottom-[8.4rem]');
      return;
    }

    wishProduct(id);
  };

  return (
    <LikeButton
      isLiked={isLiked}
      handleClick={handleLike}
      aria-label={isLiked ? '좋아요 취소' : '좋아요'}
      className={cn('h-[1.4rem] w-[1.4rem]', isLiked ? 'text-neon-black' : 'text-black-1')}
    />
  );
}
