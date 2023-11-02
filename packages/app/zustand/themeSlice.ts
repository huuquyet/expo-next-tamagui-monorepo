import { StateCreator } from 'zustand'

type mode = 'dark' | 'light'

export interface ThemeSlice {
  theme: mode
  toggleTheme: () => void
}

const getDefaultState = {
  theme: 'dark' as mode,
}

export const createThemeSlice: StateCreator<ThemeSlice, [], [], ThemeSlice> = (set, get) => ({
  ...getDefaultState,
  toggleTheme: () => {
    set({ theme: get().theme === 'dark' ? 'light' : 'dark' })
  },
})
