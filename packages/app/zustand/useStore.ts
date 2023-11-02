import AsyncStorage from '@react-native-async-storage/async-storage'
import { isWindowDefined } from '@tamagui/constants'
import { create } from 'zustand'
import { devtools, persist, createJSONStorage } from 'zustand/middleware'

import { ClockSlice, createClockSlice } from './clockSlice'
import { CounterSlice, createCounterSlice } from './counterSlice'
import { ThemeSlice, createThemeSlice } from './themeSlice'

const useBoundStore = create<ClockSlice & CounterSlice & ThemeSlice>()(
  devtools(
    persist(
      (...a) => ({
        ...createClockSlice(...a),
        ...createCounterSlice(...a),
        ...createThemeSlice(...a),
      }),
      {
        name: 'zustand',
        storage: createJSONStorage(() => (isWindowDefined ? window.localStorage : AsyncStorage)),
      }
    ),
    { enabled: false }
  )
)

export const useClockStore = () => {
  return useBoundStore((store) => ({
    lastUpdate: store.lastUpdate,
    tick: store.tick,
  }))
}

export const useCounterStore = () => {
  return useBoundStore((store) => ({
    count: store.count,
    amount: store.amount,
    loading: store.loading,
    setAmount: store.setAmount,
    increment: store.increment,
    decrement: store.decrement,
    reset: store.reset,
    incrementByAmount: store.incrementByAmount,
    incrementAsync: store.incrementAsync,
    incrementIfOddAsync: store.incrementIfOddAsync,
  }))
}

export const useThemeStore = () => {
  return useBoundStore((store) => ({
    theme: store.theme,
    toggleTheme: store.toggleTheme,
  }))
}
