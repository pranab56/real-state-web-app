'use client';

import { hydrate } from '@/features/auth/authSlice';
import { store } from '@/utils/store';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { getRefreshToken, getToken, getUser } from '@/utils/storage';

function AuthHydrator() {
  useEffect(() => {
    store.dispatch(hydrate({
      token: getToken(),
      refreshToken: getRefreshToken(),
      user: getUser(),
    }));
  }, []);

  return null;
}

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthHydrator />
      {children}
    </Provider>
  );
}
