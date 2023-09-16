'use client'

import { useServerInsertedHTML } from 'next/navigation'
import { TamaguiProvider as TamaguiProviderOG } from 'tamagui'
import { NextThemeProvider, useRootTheme } from '@tamagui/next-theme'

import '@tamagui/core/reset.css'
import '@tamagui/polyfill-dev'

import Tamagui from '../tamagui.config'

export const TamaguiProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useRootTheme()

  useServerInsertedHTML(() => {
    // this first time this runs you'll get the full CSS including all themes
    // after that, it will only return CSS generated since the last call
    return <>{Tamagui.getNewCSS()}</>
  })

  return (
    <NextThemeProvider
      onChangeTheme={(next) => {
        setTheme(next as any)
      }}
    >
      <TamaguiProviderOG config={Tamagui} themeClassNameOnRoot defaultTheme={theme}>
        {children}
      </TamaguiProviderOG>
    </NextThemeProvider>
  )
}
