jest.mock('lottie-react', () => {
  const React = require('react');

  const MockLottie = ({ className, animationData, ...props }) =>
    React.createElement('div', {
      'data-testid': 'lottie-mock',
      className,
      ...props,
    });

  return {
    __esModule: true,
    default: MockLottie,
  };
});

jest.mock('next/navigation', () => ({
  __esModule: true,
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));
