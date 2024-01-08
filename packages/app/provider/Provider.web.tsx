import { CustomToast, TamaguiProvider, TamaguiProviderProps, ToastProvider, config } from '@my/ui'
import { NextThemeProvider, useRootTheme, useThemeSetting } from '@tamagui/next-theme'
import { createThemeStore, type mode, useThemeStore } from 'app/zustand'
import { useEffect } from 'react'
import { ToastViewport } from './ToastViewport'

export function Provider({ children, ...rest }: Omit<TamaguiProviderProps, 'config'>) {
  const [theme, setTheme] = useRootTheme()
  const themeSetting = useThemeSetting()!
  const { scheme } = useThemeStore()

  useEffect(() => {
    createThemeStore.persist.rehydrate()
  }, [])

  const current = () => {
    if (scheme === ('system' as mode)) {
      return themeSetting.systemTheme as mode
    }
    return scheme
  }

  return (
    <NextThemeProvider
      skipNextHead
      onChangeTheme={(next: any) => {
        setTheme(next)
      }}
    >
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
    </NextThemeProvider>
  )
}
