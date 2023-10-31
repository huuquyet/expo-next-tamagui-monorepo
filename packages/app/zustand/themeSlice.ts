import { StateCreator } from 'zustand'

type mode = 'dark' | 'light'

export interface ThemeSlice {
  theme: mode
  setTheme: (theme: string) => void
  toggleTheme: () => void
}

const getDefaultState = {
  theme: 'dark' as mode,
}

export const createThemeSlice: StateCreator<ThemeSlice, [], [], ThemeSlice> = (set, get) => ({
  ...getDefaultState,
  setTheme: (theme: string) => {
    set({ theme: theme === 'dark' ? 'dark' : 'light' })
  },
  toggleTheme: () => {
    set({ theme: get().theme === 'dark' ? 'light' : 'dark' })
  },
})
