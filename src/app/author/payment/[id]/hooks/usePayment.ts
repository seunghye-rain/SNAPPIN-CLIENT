'use client';

import { useState } from 'react';

export const usePayment = (basePrice: number) => {
  const [extraPrices, setExtraPrices] = useState<
    {
      name: string;
      amount: number;
    }[]
  >([]);
  const [totalPrice, setTotalPrice] = useState(basePrice);

  const addExtraPrice = (name: string, amount: number) => {
    setExtraPrices((prev) => [...prev, { name, amount }]);
    setTotalPrice((prev) => prev + amount);
  };

  return { extraPrices, addExtraPrice, totalPrice };
};
