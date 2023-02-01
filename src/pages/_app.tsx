import { Inter } from '@next/font/google';
import type { AppProps } from 'next/app';
import '~/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
      className={inter.className}
    >
      <Component {...pageProps} />
    </div>
  );
}
