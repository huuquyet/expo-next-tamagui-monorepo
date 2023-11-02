import AsyncStorage from '@react-native-async-storage/async-storage'
import { isWindowDefined } from '@tamagui/constants'
import { create } from 'zustand'
import { devtools, persist, createJSONStorage } from 'zustand/middleware'

type mode = 'dark' | 'light'

interface ThemeInterface {
  theme: mode
  toggleTheme: () => void
}

const getDefaultState = {
  theme: 'dark' as mode,
}

const createThemeStore = create<ThemeInterface>()(
  devtools(
    persist(
      (set, get) => ({
        ...getDefaultState,
        toggleTheme: () => {
          set({ theme: get().theme === 'dark' ? 'light' : 'dark' })
        },
      }),
      {
        name: 'theme',
        storage: createJSONStorage(() => (isWindowDefined ? window.localStorage : AsyncStorage)),
      }
    ),
    { enabled: false }
  )
)

export const useThemeStore = () => {
  return createThemeStore((store) => ({
    theme: store.theme,
    toggleTheme: store.toggleTheme,
  }))
}
