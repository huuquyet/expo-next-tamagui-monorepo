import { useColorScheme } from 'react-native'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

import { useThemeStore } from 'app/zustand'
import { Provider } from 'app/provider'
import { tamaguiFonts } from './tamaguiFonts.native'

export default function HomeLayout() {
  const [loaded] = useFonts(tamaguiFonts)
  if (!loaded) {
    return null
  }

  const setTheme = useThemeStore((state) => state.setTheme)
  setTheme(useColorScheme() as any)
  const theme = useThemeStore((state) => state.theme)

  return (
    <ThemeProvider value={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <Provider defaultTheme={theme}>
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
