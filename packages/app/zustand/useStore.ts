import AsyncStorage from '@react-native-async-storage/async-storage'
import { isWindowDefined } from '@tamagui/constants'
import { create } from 'zustand'
import { devtools, persist, createJSONStorage } from 'zustand/middleware'

import { ClockSlice, createClockSlice } from './clockSlice'
import { CounterSlice, createCounterSlice } from './counterSlice'
import { ThemeSlice, createThemeSlice } from './themeSlice'

export const useBoundStore = create<ClockSlice & CounterSlice & ThemeSlice>()(
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
