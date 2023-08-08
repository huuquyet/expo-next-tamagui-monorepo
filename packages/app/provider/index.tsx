import { useColorScheme } from 'react-native'
import { Provider } from 'react-redux'

import { ToastViewport } from './ToastViewport'
import config from '../tamagui.config'
import { store } from '../features/store/initializeStore'
import { CustomToast, TamaguiProvider, TamaguiProviderProps, ToastProvider } from '@my/ui'

export function AppProvider({ children, ...rest }: Omit<TamaguiProviderProps, 'config'>) {
  const scheme = useColorScheme()
  return (
    <Provider store={store}>
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
    </Provider>
  )
}
