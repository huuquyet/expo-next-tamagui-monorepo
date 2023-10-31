import { StateCreator } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { fetchIdentityCount } from './fetchIdentityCount'

type statusLoading = 'idle' | 'loading' | 'failed'

export interface CounterSlice {
  count: number
  amount: number
  loading: statusLoading
  setAmount: (amount: number) => void
  increment: () => void
  decrement: () => void
  reset: () => void
  incrementByAmount: (by: number) => void
  incrementAsync: (by: number) => Promise<void>
  incrementIfOddAsync: (by: number) => void
}

const getDefaultState = {
  count: 0,
  amount: 2,
  loading: 'idle' as statusLoading,
}

export const createCounterSlice: StateCreator<
  CounterSlice,
  [],
  [['zustand/immer', never]],
  CounterSlice
> = immer((set, get) => ({
  ...getDefaultState,
  setAmount: (amount: number) => {
    set({ amount })
  },
  increment: () => {
    set((state) => {
      count: state.count += 1
    })
  },
  decrement: () => {
    set((state) => {
      state.count -= 1
    })
  },
  reset: () => {
    set((state) => {
      state.count = getDefaultState.count
    })
  },
  incrementByAmount: (by: number) => {
    set((state) => {
      state.count += by
    })
  },
  incrementAsync: async (by: number) => {
    set({ loading: 'loading' })
    const response = await fetchIdentityCount(by)
    set((state) => {
      state.count += response.data
    })
    set({ loading: 'idle' })
  },
  incrementIfOddAsync: (by: number) => {
    if (get().count % 2 === 1) {
      get().incrementByAmount(by)
    }
  },
}))
