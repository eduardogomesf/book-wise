import { AppProps } from 'next/app'
import { globalStyles } from '../styles'
import { Nunito } from "next/font/google";
import { SessionProvider } from 'next-auth/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../lib/react-query';

const nunito = Nunito({
  subsets: ['latin'],
  display: 'swap',
})

globalStyles()

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <div
          className={`${nunito.className}`}
        >
          <Component {...pageProps} />
        </div>
      </SessionProvider>
    </QueryClientProvider>
  )
}
