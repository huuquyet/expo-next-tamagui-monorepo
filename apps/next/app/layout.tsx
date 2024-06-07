import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { NextTamaguiProvider } from './NextTamguiProvider'

const APP_TITLE = 'Tamagui Expo Next.js Monorepo App'
const APP_DESCRIPTION = 'Tamagui, Expo, Next.js & Solito monorepo'
const APP_URL = 'https://expo-next-tamagui-monorepo.vercel.app/'
const APP_TWITTER = '@HuuQuyetNg'

export const metadata: Metadata = {
  title: APP_TITLE,
  description: APP_DESCRIPTION,
  icons: '/favicon.ico',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // You can use `suppressHydrationWarning` to avoid the warning about mismatched content during hydration in dev mode
    <html lang="en" suppressHydrationWarning>
      <body>
        <NextTamaguiProvider>{children}</NextTamaguiProvider>
      </body>
    </html>
  )
}
