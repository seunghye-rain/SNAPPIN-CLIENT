import PageClient from './page.client';

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  return (
    <div className='bg-black-3 flex min-h-dvh flex-col'>
      <PageClient id={Number(id)} />
    </div>
  );
}
