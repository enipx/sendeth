import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { OreoProvider, DefaultTheme } from '@oreo-ui/web'
import { TransactionProvider } from '@/context/TransactionContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <OreoProvider>
      <TransactionProvider>
        <Component {...pageProps} />
      </TransactionProvider>
    </OreoProvider>
  )
}
