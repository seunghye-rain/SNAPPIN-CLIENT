import { IconSearch } from '@/assets';
import { cn } from '@/utils/cn';
import React from 'react';

type SearchFieldVariant = 'searchBar' | 'headerSearch';

const SEARCH_FIELD_THEME = {
  searchBar: {
    containerClassName:
      'bg-black-3 relative flex w-full items-center gap-[0.8rem] rounded-[4rem] px-[1.5rem] py-[1.15rem]',
    iconClassName: 'text-black-9 h-[2.4rem] w-[2.4rem]',
    placeholderClassName: 'text-black-7 caption-14-md',
    textWrapperClassName: '',
  },
  headerSearch: {
    containerClassName:
      'bg-black-3 relative flex w-full items-center gap-[1.5rem] rounded-[4rem] px-[2rem] py-[1.2rem]',
    iconClassName: 'text-black-7 h-[2.4rem] w-[2.4rem]',
    headlineClassName: 'caption-14-bd text-black-9',
    supportingTextClassName: 'caption-12-md text-black-7',
    textWrapperClassName: 'flex flex-col gap-[0.4rem]',
  },
} as const satisfies Record<SearchFieldVariant, Record<string, string>>;

type SearchFieldBaseProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant: SearchFieldVariant;
  placeholder?: string;
  headline?: string;
  supportingText?: string;
  icon?: React.ReactNode | null;
};

const SearchFieldBase = React.forwardRef<HTMLButtonElement, SearchFieldBaseProps>(
  (
    {
      className: buttonClassName,
      variant,
      placeholder,
      headline,
      supportingText,
      icon,
      type = 'button',
      ...buttonProps
    },
    ref,
  ) => {
    const headlineText = headline ?? '';
    const shouldRenderHeaderText = variant === 'headerSearch';
    const theme = SEARCH_FIELD_THEME[variant];
    const resolvedIcon =
      icon === null
        ? null
        : (icon ?? <IconSearch className={theme.iconClassName} aria-hidden='true' />);

    return (
      <button
        {...buttonProps}
        type={type}
        ref={ref}
        className={cn(theme.containerClassName, buttonClassName)}
        data-variant={variant}
      >
        {resolvedIcon ? <span className='shrink-0'>{resolvedIcon}</span> : null}
        <span className={cn('min-w-0 flex-1 text-left', theme.textWrapperClassName)}>
          {shouldRenderHeaderText ? (
            <>
              <span className={cn(SEARCH_FIELD_THEME.headerSearch.headlineClassName)}>
                {headlineText}
              </span>
              {supportingText ? (
                <span className={cn(SEARCH_FIELD_THEME.headerSearch.supportingTextClassName)}>
                  {supportingText}
                </span>
              ) : null}
            </>
          ) : (
            <span className={cn(SEARCH_FIELD_THEME.searchBar.placeholderClassName)}>
              {placeholder}
            </span>
          )}
        </span>
      </button>
    );
  },
);

SearchFieldBase.displayName = 'SearchFieldBase';
export default SearchFieldBase;
