'use client';
import { formatPrice } from '@/utils/price';
import { Button, Divider } from '@/ui';
import { IconAdd } from '@/assets';
import { usePayment } from '../../hooks/usePayment';
import { useState } from 'react';
import AddPaymentModal from '../../@modal/(.)add-payment-modal/AddPaymentModal';

type PaymentDetailProps = {
  basePrice: number;
};

type DetailRowProps = {
  label: string;
  value: string;
};

export default function PaymentDetail({ basePrice }: PaymentDetailProps) {
  const { extraPrices, addExtraPrice } = usePayment(basePrice);
  const [open, setOpen] = useState(false);
  const handleOpenChange = (open: boolean) => {
    setOpen(open);
  };
  return (
    <div className='relative'>
      <div className='border-black-5 flex flex-col gap-[1.2rem] rounded-[0.6rem] border-1 p-[1.7rem]'>
        <DetailRow label='기본 촬용 비용' value={`${formatPrice(basePrice)}`} />
        {extraPrices.length > 0 &&
          extraPrices.map((extraPrice) => (
            <DetailRow
              key={extraPrice.name}
              label={extraPrice.name}
              value={`${formatPrice(extraPrice.amount)}`}
            />
          ))}
        <Button
          className='caption-14-bd bg-black-3 text-black-8 flex items-center gap-[0.4rem]'
          size='large'
          onClick={() => setOpen(true)}
        >
          <IconAdd />
          <span>촬영 비용 추가</span>
        </Button>
        <Divider thickness='small' color='bg-black-5' />
        <DetailRow
          label='최종 결제 금액'
          value={`${formatPrice(basePrice + extraPrices.reduce((acc, curr) => acc + curr.amount, 0))}`}
        />
      </div>
      <AddPaymentModal
        open={open}
        handleOpenChange={handleOpenChange}
        addExtraPrice={addExtraPrice}
      />
    </div>
  );
}

function DetailRow({ label, value }: DetailRowProps) {
  return (
    <div className='flex items-center justify-between'>
      <span className='caption-12-md'>{label}</span>
      <span className='caption-14-md'>{value}</span>
    </div>
  );
}
