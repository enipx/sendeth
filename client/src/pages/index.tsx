import Head from 'next/head'
import { Inter } from 'next/font/google'
import { Container, Flex, View } from '@oreo-ui/web'
import { Header, Footer, RecipientForm } from '@/component'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Sendeth - Transfer ETH at ease</title>
        <meta name="description" content="A simple web3 dapp that makes sending Eth to anyone a breeze ⚡" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container type="sm" className={`${inter.className}`}>
        <Flex px="lg" center column height="calc(100vh - 1rem)">
          <Header/>
          <RecipientForm/>
          <Footer/>
        </Flex>
      </Container>
    </>
  )
}
