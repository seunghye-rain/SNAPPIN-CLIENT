import AiCurationProvider from './provider';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AiCurationProvider>{children}</AiCurationProvider>;
}
