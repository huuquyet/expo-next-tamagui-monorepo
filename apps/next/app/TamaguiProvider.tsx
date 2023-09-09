'use client'

import { useServerInsertedHTML } from 'next/navigation'
import { createTamagui, TamaguiProvider as TamaguiProviderOG } from 'tamagui'
import { config as configBase } from '@tamagui/config'
import { NextThemeProvider, useRootTheme } from '@tamagui/next-theme'

import '@tamagui/core/reset.css'
import '@tamagui/polyfill-dev'

import Tamagui from '../tamagui.config'

const config = createTamagui({
  ...configBase,
  themeClassNameOnRoot: false,
})

export type Conf = typeof config

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}

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
      <TamaguiProviderOG config={config} themeClassNameOnRoot defaultTheme={theme}>
        {children}
      </TamaguiProviderOG>
    </NextThemeProvider>
  )
}
