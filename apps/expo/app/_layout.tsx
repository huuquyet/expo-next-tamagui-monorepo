import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

import { Provider } from 'app/provider'
import { useThemeStore } from 'app/zustand'
import { tamaguiFonts } from './tamaguiFonts.native'

export default function HomeLayout() {
  const { theme } = useThemeStore()

  const [loaded] = useFonts(tamaguiFonts)
  if (!loaded) {
    return null
  }

  return (
    <ThemeProvider value={theme === 'dark' ? DarkTheme : DefaultTheme}>
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
    </ThemeProvider>
  )
}
