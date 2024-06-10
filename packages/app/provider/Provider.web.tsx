import {
  NativeToast,
  TamaguiProvider,
  type TamaguiProviderProps,
  ToastProvider,
  config,
} from '@my/ui'
import { NextThemeProvider, useRootTheme, useThemeSetting } from '@tamagui/next-theme'
import { type mode, useThemeStore } from 'app/zustand'
import { ToastViewport } from './ToastViewport'

export function Provider({ children, ...rest }: Omit<TamaguiProviderProps, 'config'>) {
  const [_, setTheme] = useRootTheme()
  const themeSetting = useThemeSetting()!
  const { scheme } = useThemeStore()

  const current = () => {
    if (scheme === ('system' as mode)) {
      return themeSetting.systemTheme as mode
    }
    return scheme
  }

  return (
    <NextThemeProvider onChangeTheme={setTheme as any}>
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

          <NativeToast />
          <ToastViewport />
        </ToastProvider>
      </TamaguiProvider>
    </NextThemeProvider>
  )
}
