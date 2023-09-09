import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

import { Provider } from 'app/provider'
import { tamaguiFonts } from './tamaguiFonts.native'

export default function HomeLayout() {
  const [loaded] = useFonts(tamaguiFonts)

  if (!loaded) {
    return null
  }
  return (
    <Provider>
      <Stack
        screenOptions={{
          headerTitleStyle: {
            fontFamily: '$silkscreen',
          },
        }}
      />
      <StatusBar style="auto" />
    </Provider>
  )
}
