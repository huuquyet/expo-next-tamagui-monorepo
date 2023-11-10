import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'
import { mmkvStorage } from './mmkvStorage'

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
        storage: createJSONStorage(() => mmkvStorage),
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
