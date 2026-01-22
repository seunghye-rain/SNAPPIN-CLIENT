'use client';

import { useEffect, useState } from 'react';
import { getLoginStatus } from '../localStorage';

export function useAuth() {
  const [isLogIn, setIsLogIn] = useState<boolean | null>(null);

  const sync = () => {
    setIsLogIn(getLoginStatus() === 'logged_in');
  };

  useEffect(() => {
    sync();
    window.addEventListener('auth:changed', sync);
    return () => window.removeEventListener('auth:changed', sync);
  }, []);

  return { isLogIn };
}
