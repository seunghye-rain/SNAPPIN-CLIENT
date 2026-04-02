import type { ReactNode } from 'react';
import { ClientNavigation } from './components/index';
import { OnBoardingFormProvider } from './hooks/useOnBoardingFormContext';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <OnBoardingFormProvider>
      <div className='flex h-dvh w-full flex-col'>
        <ClientNavigation />
        {children}
      </div>
    </OnBoardingFormProvider>
  );
}
