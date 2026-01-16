import { Divider, ProductCard } from '@/ui';
import { ClientHeader } from './components';
import { REVIEW_PRODUCT } from './mock/reviewProduct.mock';
import { ReviewFormSection, ReviewStarSection } from './_section';
import ClientFooter from './components/client-footer/ClientFooter';
import ImageUploadSection from './_section/ImageUploadSection';

export default function Page() {
  const data = REVIEW_PRODUCT.reservations.reservation;

  return (
    <>
      <ClientHeader />
      <section className='py-[1.6rem] pr-[4.2rem] pl-[2rem]'>
        <ProductCard
          image={{ src: data.product.imageUrl, alt: data.product.title }}
          name={data.product.title}
          rate={data.product.rate}
          reviewCount={data.product.reviewCount}
          photographer={data.product.photographer}
          price={data.product.price}
          moods={data.product.moods}
        />
      </section>
      <Divider thickness='large' color='bg-black-3' />
      <ReviewStarSection />
      <ReviewFormSection />
      <ImageUploadSection />
      <ClientFooter />
    </>
  );
}
