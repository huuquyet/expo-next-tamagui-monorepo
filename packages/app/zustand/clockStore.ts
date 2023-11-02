import AsyncStorage from '@react-native-async-storage/async-storage'
import { isWindowDefined } from '@tamagui/constants'
import { create } from 'zustand'
import { devtools, persist, createJSONStorage } from 'zustand/middleware'

interface ClockInterface {
  lastUpdate: number
  tick: (lastupdate: number) => void
}

const createClockStore = create<ClockInterface>()(
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
        storage: createJSONStorage(() => (isWindowDefined ? window.localStorage : AsyncStorage)),
      }
    ),
    { enabled: false }
  )
)

export const useClockStore = () => {
  return createClockStore((store) => ({
    lastUpdate: store.lastUpdate,
    tick: store.tick,
  }))
}
