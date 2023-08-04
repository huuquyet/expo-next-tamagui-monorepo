import { Stack } from 'expo-router'

import { UserDetailScreen } from 'app/features/user/detail-screen'

export default function Screen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'User',
        }}
      />
      <UserDetailScreen />
    </>
  )
}
