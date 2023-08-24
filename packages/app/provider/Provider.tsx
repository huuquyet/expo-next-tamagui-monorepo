import { useColorScheme } from 'react-native'

import { ToastViewport } from './ToastViewport'
import config from 'app/tamagui.config'
import { StoreProvider, initializeStore } from 'app/zustand'
import { CustomToast, TamaguiProvider, TamaguiProviderProps, ToastProvider } from '@my/ui'

export function Provider({ children, ...rest }: Omit<TamaguiProviderProps, 'config'>) {
  const scheme = useColorScheme()

  const zustandStore = initializeStore()
  const storeProps = JSON.parse(JSON.stringify(zustandStore.getState()))

  return (
    <StoreProvider {...storeProps}>
      <TamaguiProvider
        config={config}
        disableInjectCSS
        defaultTheme={scheme === 'dark' ? 'dark' : 'light'}
        {...rest}
      >
        <ToastProvider
          swipeDirection="horizontal"
          duration={6000}
          native={
            [
              /* uncomment the next line to do native toasts on mobile. NOTE: it'll require you making a dev build and won't work with Expo Go */
              // 'mobile'
            ]
          }
        >
          {children}

          <CustomToast />
          <ToastViewport />
        </ToastProvider>
      </TamaguiProvider>
    </StoreProvider>
  )
}
