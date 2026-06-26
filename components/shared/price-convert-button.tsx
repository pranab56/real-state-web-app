'use client';

import { useLazyGetExchangeRatesQuery } from '@/utils/exchangeRateApi';
import { useState } from 'react';

interface PriceConvertButtonProps {
  price?: number;
  currency?: string;
}

export function PriceConvertButton({ price, currency }: PriceConvertButtonProps) {
  const [trigger] = useLazyGetExchangeRatesQuery();
  const [convertedText, setConvertedText] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // According to current implementation, only convert if currency is USD
  if (currency !== 'USD' || price == null) return null;

  const handleConvert = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLoading(true);
    try {
      const res = await trigger('USD').unwrap();
      const rate = res?.rates?.ETB;
      if (!rate) return;
      setConvertedText(`ETB ${Math.round(price * rate).toLocaleString()}`);
      setTimeout(() => setConvertedText(null), 3000);
    } catch {
      // conversion is a non-critical enhancement — fail silently
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleConvert}
      disabled={isLoading}
      className="shrink-0 h-7 px-2.5 rounded-full border border-primary/30 text-primary text-[10px] sm:text-[11px] font-medium hover:bg-primary hover:text-white transition-all disabled:opacity-60 cursor-pointer whitespace-nowrap"
    >
      {isLoading ? '...' : convertedText ?? 'Convert ETB'}
    </button>
  );
}
