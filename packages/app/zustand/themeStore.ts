import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'

import { mmkvStorage } from './mmkvStorage'

type mode = 'dark' | 'light'

interface ThemeInterface {
  theme: mode
  toggleTheme: () => void
}

const getDefaultState = {
  theme: 'dark' as mode,
}

export const createThemeStore = create<ThemeInterface>()(
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
        storage: createJSONStorage(() => mmkvStorage),
        skipHydration: true,
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
