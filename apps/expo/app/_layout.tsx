import { useColorScheme } from 'react-native'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'

import { AppProvider } from 'app/provider'
import { tamaguiFonts } from './tamaguiFonts.native'

export default function HomeLayout() {
  const [loaded] = useFonts(tamaguiFonts)
  const scheme = useColorScheme()

  if (!loaded) {
    return null
  }
  return (
    <AppProvider>
      <ThemeProvider value={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack
          screenOptions={{
            headerTitleStyle: {
              fontFamily: '$silkscreen',
            },
          }}
        />
      </ThemeProvider>
    </AppProvider>
  )
}
