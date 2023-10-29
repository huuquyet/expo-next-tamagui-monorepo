import AsyncStorage from '@react-native-async-storage/async-storage'
import { isWindowDefined } from '@tamagui/constants'
import { create } from 'zustand'
import { devtools, persist, createJSONStorage } from 'zustand/middleware'

interface ClockState {
  lastUpdate: number
  tick: (lastupdate: number) => void
}

export const useClockStore = create<ClockState>()(
  devtools(
    persist(
      (set) => ({
        lastUpdate: Date.now(),
        tick: (lastUpdate) => {
          set({
            lastUpdate,
          })
        },
      }),
      {
        name: 'clock',
        storage: createJSONStorage(() => (!isWindowDefined ? window.localStorage : AsyncStorage)),
      }
    ),
    { enabled: false }
  )
)
