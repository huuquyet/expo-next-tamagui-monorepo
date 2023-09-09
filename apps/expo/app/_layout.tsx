import { useColorScheme } from 'react-native'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

import { Provider } from 'app/provider'
import { Theme } from '@my/ui'
import { tamaguiFonts } from './tamaguiFonts.native'

export default function HomeLayout() {
  const [loaded] = useFonts(tamaguiFonts)
  const scheme = useColorScheme()

  if (!loaded) {
    return null
  }
  return (
    <Provider>
      <ThemeProvider value={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Theme name={scheme === 'dark' ? 'dark' : 'light'}>
          <Stack
            screenOptions={{
              headerTitleStyle: {
                fontFamily: '$silkscreen',
              },
            }}
          />
          <StatusBar style="auto" />
        </Theme>
      </ThemeProvider>
    </Provider>
  )
}
