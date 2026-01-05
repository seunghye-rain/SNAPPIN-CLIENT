import { IconSearch } from '@/assets';
import { cn } from '@/utils/cn';
import React from 'react';

type SearchFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  containerClassName?: string;
  inputWrapperClassName?: string;
  iconWrapperClassName?: string;
  iconClassName?: string;
  textContainerClassName?: string;
  headlineClassName?: string;
  supportingTextClassName?: string;
  variant?: 'default' | 'header';
  headline?: string;
  supportingText?: string;
  icon?: React.ReactNode | null;
};

const SearchField = React.forwardRef<HTMLInputElement, SearchFieldProps>(
  (
    {
      className,
      containerClassName,
      inputWrapperClassName,
      iconWrapperClassName,
      iconClassName,
      textContainerClassName,
      headlineClassName,
      supportingTextClassName,
      variant = 'default',
      headline,
      supportingText,
      icon,
      type = 'search',
      value,
      defaultValue,
      onChange,
      ...props
    },
    ref,
  ) => {
    const defaultValueText = Array.isArray(defaultValue)
      ? defaultValue.join(',')
      : typeof defaultValue === 'string' || typeof defaultValue === 'number'
        ? `${defaultValue}`
        : '';
    const [hasValue, setHasValue] = React.useState(defaultValueText.length > 0 ? true : false);
    const valueText = Array.isArray(value)
      ? value.join(',')
      : typeof value === 'string' || typeof value === 'number'
        ? `${value}`
        : '';
    const shouldUseControlledValue = typeof value !== 'undefined' ? true : false;
    const resolvedHasValue = shouldUseControlledValue ? valueText.length > 0 : hasValue;
    const headlineText = variant === 'header' ? headline ?? '' : '';
    const shouldRenderHeaderText =
      variant === 'header' ? Boolean(headlineText || supportingText) : false;
    const resolvedIcon =
      icon === null ? null : icon ?? <IconSearch className={iconClassName} aria-hidden='true' />;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const nextHasValue = event.target.value.length > 0 ? true : false;
      setHasValue(nextHasValue);
      onChange ? onChange(event) : undefined;
    };

    return (
      <div
        className={cn(containerClassName)}
        data-variant={variant}
        data-has-value={resolvedHasValue ? 'true' : 'false'}
      >
        {resolvedIcon ? <span className={cn(iconWrapperClassName)}>{resolvedIcon}</span> : null}
        <div className={cn(inputWrapperClassName)}>
          <input
            type={type}
            ref={ref}
            value={shouldUseControlledValue ? value : undefined}
            defaultValue={shouldUseControlledValue ? undefined : defaultValue}
            onChange={handleChange}
            className={cn(className)}
            {...props}
          />
          {shouldRenderHeaderText ? (
            <div
              className={cn(textContainerClassName)}
              aria-hidden={resolvedHasValue ? 'true' : undefined}
            >
              <span className={cn(headlineClassName)}>{headlineText}</span>
              {supportingText ? (
                <span className={cn(supportingTextClassName)}>{supportingText}</span>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    );
  },
);

SearchField.displayName = 'SearchField';
export default SearchField;
