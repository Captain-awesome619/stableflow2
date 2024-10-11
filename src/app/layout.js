'use client'
import localFont from "next/font/local";
import "./globals.css";
import { PrivyProvider } from "@privy-io/react-auth";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store,persistor } from '../store/index';
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
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        
          <PrivyProvider appId={process.env.PRIVY_APP_ID} appSecret={process.env.PRIVY_APP_SECRET}> 
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
