'use client';

import {
  CheckboxField,
  SelectField,
} from '@/app/(auth)/on-boarding/[step]/components/on-boarding-fields/OnBoardingFieldControls';
import { useOnBoardingFormContext } from '@/app/(auth)/on-boarding/[step]/hooks/useOnBoardingFormContext';
import {
  GENDER_LABELS,
  INTEREST_LABELS,
} from '@/app/(auth)/on-boarding/[step]/constants/onBoardingForm.schema';
import type { OnBoardingField } from '@/app/(auth)/on-boarding/[step]/types/onBoardingStep';
import { TextField } from '@snappin/design-system';

type Props = {
  fields: readonly OnBoardingField[];
};

export default function OnBoardingFields({ fields }: Props) {
  const {
    compatibleFormData,
    compatibleErrors,
    updateName,
    updateGender,
    updateNickname,
    updatePhoneNumber,
    updateEmail,
    updateInterest,
  } = useOnBoardingFormContext();

  return (
    <div className='flex flex-col gap-[3.2rem]'>
      {fields.map((field) => {
        const errorText = compatibleErrors[field.name];

        if (field.type === 'text') {
          return (
            <TextField
              id={field.name}
              key={field.name}
              label={field.label}
              placeholder={field.placeholder}
              value={compatibleFormData[field.name]}
              onChange={(event) => {
                const nextValue = event.target.value;

                if (field.name === 'name') {
                  updateName(nextValue);
                  return;
                }

                if (field.name === 'nickname') {
                  updateNickname(nextValue);
                  return;
                }

                if (field.name === 'phoneNumber') {
                  updatePhoneNumber(nextValue);
                  return;
                }

                updateEmail(nextValue);
              }}
              hasError={Boolean(errorText)}
              helpText={errorText}
            />
          );
        }

        if (field.type === 'select') {
          return (
            <SelectField
              key={field.name}
              label={field.label}
              value={compatibleFormData[field.name]}
              onChange={updateGender}
              options={field.options}
              labels={GENDER_LABELS}
              error={Boolean(errorText)}
              errorText={errorText}
            />
          );
        }

        return (
          <CheckboxField
            key={field.name}
            label={field.label}
            value={compatibleFormData[field.name]}
            onChange={updateInterest}
            options={field.options}
            labels={INTEREST_LABELS}
            error={Boolean(errorText)}
            errorText={errorText}
          />
        );
      })}
    </div>
  );
}
