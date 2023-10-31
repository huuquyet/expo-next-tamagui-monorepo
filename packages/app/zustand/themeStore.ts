import AsyncStorage from '@react-native-async-storage/async-storage'
import { isWindowDefined } from '@tamagui/constants'
import { create } from 'zustand'
import { devtools, persist, createJSONStorage } from 'zustand/middleware'

type mode = 'dark' | 'light'

interface ThemeInterface {
  theme: mode
  setTheme: (theme: string) => void
  toggleTheme: () => void
}

const getDefaultState = {
  theme: 'dark' as mode,
}

export const useThemeStore = create<ThemeInterface>()(
  devtools(
    persist(
      (set, get) => ({
        ...getDefaultState,
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
