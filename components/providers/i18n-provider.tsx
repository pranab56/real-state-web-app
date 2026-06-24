'use client';

import React, { useEffect, useState } from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18nClient from '@/lib/i18n/client';

function I18nWrapper({ children }: { children: React.ReactNode }) {
  const { ready } = useTranslation();

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-neutral-600">Loading...</div>
      </div>
    );
  }

  return <>{children}</>;
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [i18nReady, setI18nReady] = useState(() => i18nClient.isInitialized);

  useEffect(() => {
    const handleLanguageChange = (lng: string) => {
      document.dir = lng === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = lng;
    };

    if (i18nClient.isInitialized) {
      handleLanguageChange(i18nClient.language);
    } else {
      i18nClient.on('initialized', () => {
        setI18nReady(true);
        handleLanguageChange(i18nClient.language);
      });
    }

    i18nClient.on('languageChanged', handleLanguageChange);

    return () => {
      i18nClient.off('languageChanged', handleLanguageChange);
    };
  }, []);

  if (!i18nReady) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-neutral-600">Loading translations...</div>
      </div>
    );
  }

  return (
    <I18nextProvider i18n={i18nClient}>
      <I18nWrapper>{children}</I18nWrapper>
    </I18nextProvider>
  );
}
