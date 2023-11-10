import { CustomToast, TamaguiProvider, TamaguiProviderProps, ToastProvider } from '@my/ui'
import { useThemeSetting } from '@tamagui/next-theme'
import config from 'app/tamagui.config'
import { type mode, useThemeStore } from 'app/zustand'
import { ToastViewport } from './ToastViewport'

export function Provider({ children, ...rest }: Omit<TamaguiProviderProps, 'config'>) {
  const { theme } = useThemeStore()
  const themeSetting = useThemeSetting()

  const current = () => {
    if (theme === ('system' as mode)) {
      return themeSetting.systemTheme
    }
    return theme
  }

  return (
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
  )
}
