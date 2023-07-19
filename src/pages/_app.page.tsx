import { AppProps } from 'next/app'
import { globalStyles } from '../styles'
import { Nunito } from "next/font/google";
import { SessionProvider } from 'next-auth/react';

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
    <SessionProvider session={session}>
      <div
        className={`${nunito.className}`}
      >
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  )
}
