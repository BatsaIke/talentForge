'use client';

import { Rubik } from 'next/font/google';
import { Provider } from 'react-redux';
import store from '@/redux/store';
const defaultRubik = Rubik({
  subsets: ['latin'],
  weight: 'variable'
});

// export const metadata = {
//   title: 'Talent Forge',
//   description: 'A talent hunt for  Jobs and Intenshps'
// };
import './globals.css'
import Alert from '@/UI/Alert';
import StoreProvider from './storeProvider';
import Header from '@/component/header/Header';
import Footer from '@/component/footer/Footer';
import { usePathname } from 'next/navigation';
import '@fortawesome/fontawesome-svg-core/styles.css';
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false; /* eslint-disable import/first */


export default function RootLayout({ children }) {
  const pathname = usePathname();
  const excludedPages = ['/login', '/signup'];
  const shouldShowHeader = !excludedPages.includes(pathname);
 
  return (
    
      <html lang="en" suppressHydrationWarning={true}>
        <head>
        <link
    href="https://cdn.jsdelivr.net/npm/remixicon@4.0.0/fonts/remixicon.css"
    rel="stylesheet"
/>
        </head>
        <StoreProvider>
        <body
          className={defaultRubik.className}
          suppressHydrationWarning={true}
        >
          <div className="container">
            <Alert />
            {shouldShowHeader && <Header />}
            {children}
            {shouldShowHeader && <Footer />}
          </div>
        </body>
        </StoreProvider>
      </html>
   
  );
}
