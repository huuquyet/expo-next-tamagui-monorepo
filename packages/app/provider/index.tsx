import { useColorScheme } from 'react-native'
import { Provider as ReduxProvider } from 'react-redux'

import { ToastViewport } from './ToastViewport'
import config from '../tamagui.config'
import { reduxStore } from '../features/store'
import { CustomToast, TamaguiProvider, TamaguiProviderProps, ToastProvider } from '@my/ui'

export function Provider({ children, ...rest }: Omit<TamaguiProviderProps, 'config'>) {
  const scheme = useColorScheme()
  return (
    <ReduxProvider store={reduxStore}>
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
    </ReduxProvider>
  )
}
