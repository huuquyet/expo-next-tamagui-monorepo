import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'
import { mmkvStorage } from './mmkvStorage'

export type mode = 'system' | 'dark' | 'light'

interface ThemeInterface {
  theme: mode
  toggleTheme: () => void
}

const getDefaultState = {
  theme: 'system' as mode,
}

export const createThemeStore = create<ThemeInterface>()(
  devtools(
    persist(
      (set, get) => ({
        ...getDefaultState,
        toggleTheme: () => {
          set({
            theme: get().theme === 'dark' ? 'light' : get().theme === 'light' ? 'system' : 'dark',
          })
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
