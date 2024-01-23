

import Footer from '@/component/footer/Footer';
import { Rubik } from 'next/font/google';

const defaultRubik = Rubik({
  subsets: ['latin'],
  weight: 'variable',
});

export const metadata = {
  title: 'Talent Forge',
  description: 'A talent hunt for  Jobs and Intenshps'
};
import './globals.css'
export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <body className={defaultRubik.className}>
        <div className="container">{children}</div>
        
      </body>
      
    </html>
  );
}
