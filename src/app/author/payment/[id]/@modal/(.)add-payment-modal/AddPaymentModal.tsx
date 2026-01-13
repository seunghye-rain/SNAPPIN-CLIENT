'use client';
import { useState } from 'react';
import ClientHeader from '../../components/client-header/ClientHeader';

import { BottomCTAButton, TextField } from '@/ui';

type AddPaymentModalProps = {
  open: boolean;
  handleOpenChange: (open: boolean) => void;
  addExtraPrice: (name: string, amount: number) => void;
};

export default function AddPaymentModal({
  open,
  handleOpenChange,
  addExtraPrice,
}: AddPaymentModalProps) {
  if (!open) return null;

  const [name, setName] = useState('');
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [amountError, setAmountError] = useState(false);

  const handleAddExtraPrice = () => {
    addExtraPrice(name, amount ?? 0);
    handleOpenChange(false);
  };
  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isNaN(Number(e.target.value))) {
      setAmountError(false);
    } else {
      setAmountError(true);
      return;
    }
    setAmount(Number(e.target.value));
  };
  return (
    <div className='fixed-center bg-black-1 top-0 z-50 flex h-dvh w-full flex-col'>
      <ClientHeader />
      <div className='bg-black-1 flex flex-col gap-[1.2rem] px-[2rem] pt-[1.7rem] pb-[2.4rem]'>
        <h2 className='caption-14-bd'>결제 요청</h2>
        <TextField id='name' placeholder='비용명 입력' value={name} onChange={handleChangeName} />
        <TextField
          id='amount'
          placeholder='금액 입력'
          value={amount?.toString() ?? ''}
          onChange={handleChangeAmount}
          hasError={amountError}
          helpText='숫자만 입력해주세요.'
        />
      </div>
      <BottomCTAButton className='px-[2rem] pb-[2rem]'>
        <BottomCTAButton.Single
          disabled={amountError || name.length === 0 || amount === undefined}
          onClick={handleAddExtraPrice}
        >
          추가하기
        </BottomCTAButton.Single>
      </BottomCTAButton>
    </div>
  );
}
