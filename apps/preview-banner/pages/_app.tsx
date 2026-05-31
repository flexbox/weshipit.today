import { AppProps } from 'next/app';
import { Inter } from 'next/font/google';

import './styles.css';

const inter = Inter({
  display: 'swap',
  style: ['normal'],
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <div className={inter.className}>
      <Component {...pageProps} />
    </div>
  );
}

export default CustomApp;
