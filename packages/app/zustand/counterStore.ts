import AsyncStorage from '@react-native-async-storage/async-storage'
import { isWindowDefined } from '@tamagui/constants'
import { create } from 'zustand'
import { devtools, persist, createJSONStorage } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import { fetchIdentityCount } from './fetchIdentityCount'

interface CounterState {
  count: number
  amount: number
  loading: 'idle' | 'loading' | 'failed'
}

interface CounterAction {
  setAmount: (amount: number) => void
  increment: () => void
  decrement: () => void
  reset: () => void
  incrementByAmount: (by: number) => void
  incrementAsync: (by: number) => void
  incrementIfOddAsync: (by: number) => void
}

const getDefaultInitialState = () => ({
  count: 0,
  amount: 2,
  loading: 'idle' as const,
})

export const useCounterStore = create<CounterState & CounterAction>()(
  immer(
    devtools(
      persist(
        (set) => ({
          ...getDefaultInitialState(),
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
              state.count = getDefaultInitialState().count
            })
          },
          incrementByAmount: (by: number) => {
            set((state) => {
              state.count += by
            })
          },
          incrementAsync: (by: number) => {
            set(async (state) => {
              state.loading = 'loading'
              const response = await fetchIdentityCount(by)
              state.count += response.data
              state.loading = 'idle'
            })
          },
          incrementIfOddAsync: (by: number) => {
            set((state) => {
              if (state.count % 2 === 1) {
                state.incrementByAmount(by)
              }
            })
          },
        }),
        {
          name: 'counter',
          storage: createJSONStorage(() => (!isWindowDefined ? window.localStorage : AsyncStorage)),
        }
      ),
      { enabled: false }
    )
  )
)
