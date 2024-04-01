import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'
import { mmkvStorage } from './mmkvStorage'

export type mode = 'system' | 'dark' | 'light'

interface ThemeInterface {
  scheme: mode
  toggleScheme: () => void
}

const getDefaultState = {
  scheme: 'system' as mode,
}

const createThemeStore = create<ThemeInterface>()(
  devtools(
    persist(
      (set, get) => ({
        ...getDefaultState,
        toggleScheme: () => {
          set({
            scheme:
              get().scheme === 'dark' ? 'light' : get().scheme === 'light' ? 'system' : 'dark',
          })
        },
      }),
      {
        name: 'scheme',
        storage: createJSONStorage(() => mmkvStorage),
      }
    ),
    { enabled: false }
  )
)

export const useThemeStore = () => {
  return createThemeStore((store) => ({
    scheme: store.scheme,
    toggleScheme: store.toggleScheme,
  }))
}
