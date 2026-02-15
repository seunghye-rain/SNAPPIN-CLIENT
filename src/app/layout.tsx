import { Providers } from '@/app/providers';
import '@/styles/global.css';
import { Metadata, Viewport } from 'next';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "Snappin'",
  description: "나만의 무드로 연결되는 스냅",
  icons: {
    icon: "/imgs/favicon.ico",
  },
  openGraph: {
    title: "Snappin'",
    description: "나만의 무드로 연결되는 스냅",
    url: "https://snappin-client.vercel.app/",
    siteName: "Snappin'",
    images: [
      {
        url: "https://snappin-client.vercel.app/imgs/thumbnail.png",
        width: 1200,
        height: 630,
        alt: "Snappin' 썸네일",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Snappin'",
    description: "나만의 무드로 연결되는 스냅",
    images: ["https://snappin-client.vercel.app/imgs/thumbnail.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ko'>
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin='anonymous' />
        <link
          rel="preload"
          as="style"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
