'use client';

import { useEffect, useRef, useState } from 'react';
import { deleteAccessToken, getAccessToken } from '../token';
import { useRouter } from 'next/navigation';
import { deleteUserType } from '../userType';

export function useAuth() {
  const router = useRouter();
  const isLogInRef = useRef<boolean>(false);
  const [, forceRender] = useState(0); 
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    getAccessToken().then((token) => {
      isLogInRef.current = !!token;
      forceRender((v) => v + 1);
    });
  }, []);

  const logout = async () => {
    setIsLoggingOut(true);
    await deleteAccessToken();
    await deleteUserType();
    isLogInRef.current = false;
    setIsLoggingOut(false);
    router.push('/');
  };

  return {
    isLogIn: isLogInRef.current,
    logout,
    isLoggingOut,
  };
}