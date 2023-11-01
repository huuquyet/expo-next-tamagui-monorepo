import { StateCreator } from 'zustand'

export interface ClockSlice {
  lastUpdate: number
  tick: (lastupdate: number) => void
}

export const createClockSlice: StateCreator<ClockSlice, [], [], ClockSlice> = (set) => ({
  lastUpdate: Date.now(),
  tick: (lastUpdate) => {
    set({
      lastUpdate,
    })
  },
})
