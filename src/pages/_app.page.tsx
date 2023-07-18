import { AppProps } from 'next/app'
import { globalStyles } from '../styles'

globalStyles()

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <Component {...pageProps} />
  )
}
