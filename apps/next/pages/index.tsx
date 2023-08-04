import Head from 'next/head'

import { HomeScreen } from 'app/features/home/screen'

export default function Page() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <HomeScreen />
    </>
  )
}
