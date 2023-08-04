import { Stack } from 'expo-router'

import { HomeScreen } from 'app/features/home/screen'

export default function Screen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Home',
        }}
      />
      <HomeScreen />
    </>
  )
}
