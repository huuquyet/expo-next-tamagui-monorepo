import AsyncStorage from '@react-native-async-storage/async-storage'
import { isWindowDefined } from '@tamagui/constants'
import { create } from 'zustand'
import { devtools, persist, createJSONStorage } from 'zustand/middleware'

interface ThemeInterface {
  theme: 'dark' | 'light'
  setTheme: (theme: string) => void
  toggleTheme: () => void
}

export const useThemeStore = create<ThemeInterface>()(
  devtools(
    persist(
      (set, get) => ({
        theme: 'dark' as const,
        setTheme: (theme: string) => {
          set({ theme: theme === 'dark' ? 'dark' : 'light' })
        },
        toggleTheme: () => {
          set({ theme: get().theme === 'dark' ? 'light' : 'dark' })
        },
      }),
      {
        name: 'theme',
        storage: createJSONStorage(() => (!isWindowDefined ? window.localStorage : AsyncStorage)),
      }
    ),
    { enabled: false }
  )
)
