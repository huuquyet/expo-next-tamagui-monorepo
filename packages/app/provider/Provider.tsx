import { ToastViewport } from './ToastViewport'
import config from 'app/tamagui.config'
import { useThemeStore } from 'app/zustand'
import { CustomToast, TamaguiProvider, TamaguiProviderProps, ToastProvider } from '@my/ui'

export function Provider({ children, ...rest }: Omit<TamaguiProviderProps, 'config'>) {
  const theme = useThemeStore((state) => state.theme)

  return (
    <TamaguiProvider config={config} defaultTheme={theme} disableInjectCSS {...rest}>
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
