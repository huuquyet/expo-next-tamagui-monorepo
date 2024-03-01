import { CustomToast, TamaguiProvider, TamaguiProviderProps, ToastProvider, config } from '@my/ui'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { type mode, useThemeStore } from 'app/zustand'
import { Appearance } from 'react-native'
import { ToastViewport } from './ToastViewport'

export function Provider({ children, ...rest }: Omit<TamaguiProviderProps, 'config'>) {
  const { scheme } = useThemeStore()

  const current = () => {
    if (scheme === ('system' as mode)) {
      return Appearance.getColorScheme() as mode
    }
    return scheme
  }

  return (
    <ThemeProvider value={current() === 'dark' ? DarkTheme : DefaultTheme}>
      <TamaguiProvider config={config} defaultTheme={current()} disableInjectCSS {...rest}>
        <ToastProvider
          swipeDirection="horizontal"
          duration={6000}
          native={[
            /* uncomment the next line to do native toasts on mobile. NOTE: it'll require you making a dev build and won't work with Expo Go */
            'mobile',
          ]}
        >
          {children}

          <CustomToast />
          <ToastViewport />
        </ToastProvider>
      </TamaguiProvider>
    </ThemeProvider>
  )
}
