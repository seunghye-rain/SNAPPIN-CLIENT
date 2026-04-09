import { ACCESS_TOKEN_COOKIE_NAME } from './constant/cookie';

const getCookieValueFromBrowser = (name: string) => {
  if (typeof document === 'undefined') return undefined;

  const matchedCookie = document.cookie
    .split('; ')
    .find((cookie) => cookie.startsWith(`${name}=`));

  return matchedCookie ? decodeURIComponent(matchedCookie.split('=').slice(1).join('=')) : undefined;
};

async function setAccessToken(value: string) {
  if (typeof window !== 'undefined') {
    document.cookie = `${ACCESS_TOKEN_COOKIE_NAME}=${encodeURIComponent(value)}; path=/`;
    return;
  }

  const { cookies } = await import('next/headers');
  const cookieStore = await cookies();
  cookieStore.set(ACCESS_TOKEN_COOKIE_NAME, value);
}

async function getAccessToken() {
  if (typeof window !== 'undefined') {
    return getCookieValueFromBrowser(ACCESS_TOKEN_COOKIE_NAME);
  }

  const { cookies } = await import('next/headers');
  const cookieStore = await cookies();
  return cookieStore.get(ACCESS_TOKEN_COOKIE_NAME)?.value;
}

async function deleteAccessToken() {
  if (typeof window !== 'undefined') {
    document.cookie = `${ACCESS_TOKEN_COOKIE_NAME}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    return;
  }

  const { cookies } = await import('next/headers');
  const cookieStore = await cookies();
  cookieStore.delete(ACCESS_TOKEN_COOKIE_NAME);
}

async function isUserLoggedIn() {
  const isUserAccessToken = await getAccessToken();
  return Boolean(isUserAccessToken);
}

export { setAccessToken, getAccessToken, deleteAccessToken, isUserLoggedIn };
