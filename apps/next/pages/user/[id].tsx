import Head from 'next/head'

import { UserDetailScreen } from 'app/features/user/detail-screen'

export default function Page() {
  return (
    <>
      <Head>
        <title>User</title>
      </Head>
      <UserDetailScreen />
    </>
  )
}
