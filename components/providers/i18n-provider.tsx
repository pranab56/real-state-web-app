'use client';

import React, { useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18nClient from '@/lib/i18n/client';

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Initializing on client
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return children to avoid blocking SSR entirely, 
    // though translations will only appear on hydration if we don't do SSR i18n
    return <>{children}</>;
  }

  return <I18nextProvider i18n={i18nClient}>{children}</I18nextProvider>;
}
