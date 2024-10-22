'use client';
import localFont from 'next/font/local';
import './globals.css';
import { PrivyProvider } from '@privy-io/react-auth';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../store/index';
import { base } from 'viem/chains';
import { http, createConfig, WagmiProvider } from 'wagmi';
import { base as base2 } from 'wagmi/chains';
const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});
<meta name='viewport' content='width=device-width, initial-scale=1.0'></meta>;
import 'react-toastify/dist/ReactToastify.css';

export default function RootLayout({ children }) {
  const config = createConfig({
    autoConnect: true,
    publicClient: http(),
    chains: [base2],
    ssr: true,
  });
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PrivyProvider
          appId={process.env.PRIVY_APP_ID}
          config={{
            defaultChain: base,
            supportedChains: [base],
          }}
        >
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <WagmiProvider config={config}>
                <main>{children}</main>
              </WagmiProvider>
            </PersistGate>
          </Provider>
        </PrivyProvider>
      </body>
    </html>
  );
}
