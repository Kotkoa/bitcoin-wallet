import { Suspense } from 'react';
import { Provider } from 'react-redux';

import type { AppProps } from 'next/app';

import { store } from '@/store/store';

import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </Suspense>
  );
}
