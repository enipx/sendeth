import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { OreoProvider } from '@oreo-ui/web'
import { TransactionProvider } from '@/context/TransactionContext'

const theme = {
  fonts: {
    body: 'Inter'
  }
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <OreoProvider theme={theme as any}>
      <TransactionProvider>
        <Component {...pageProps} />
      </TransactionProvider>
    </OreoProvider>
  )
}
