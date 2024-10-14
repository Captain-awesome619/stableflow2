'use client'
import localFont from "next/font/local";
import "./globals.css";
import { PrivyProvider } from "@privy-io/react-auth";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store,persistor } from '../store/index';
import {base} from "viem/chains"
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
<meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
export default function RootLayout({ children }) {
  const baseRpcUrl = 'https://mainnet.base.org'; 
  const privyConfig = {
    appId: process.env.PRIVY_APP_ID, // Your Privy App ID
 
  };  
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
          <PrivyProvider  appId={process.env.PRIVY_APP_ID} config={{
            defaultChain : base, 
            supportedChains : [base], 
          }}
         
          > 
          <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
          <main>
        {children} 
        </main>
        </PersistGate>
        </Provider>
        </PrivyProvider>
      </body>
    
    </html>
 
  );
}
