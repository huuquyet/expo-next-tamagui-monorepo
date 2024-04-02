'use client'

import { config } from '@my/ui'
import '@tamagui/core/reset.css'
import '@tamagui/polyfill-dev'
import { Provider } from 'app/Provider'
import { useServerInsertedHTML } from 'next/navigation'
import { StyleSheet } from 'react-native'

export const TamaguiProvider = ({ children }: { children: React.ReactNode }) => {
  useServerInsertedHTML(() => {
    // @ts-ignore
    const rnwStyle = StyleSheet.getSheet()
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: rnwStyle.textContent }} id={rnwStyle.id} />
        <style
          dangerouslySetInnerHTML={{
            __html: config.getCSS({
              // if you are using "outputCSS" option, you should use this "exclude"
              // if not, then you can leave the option out
              exclude: process.env.NODE_ENV === 'production' ? 'design-system' : null,
            }),
          }}
        />
      </>
    )
  })

  return <Provider skipNextHead>{children}</Provider>
}
