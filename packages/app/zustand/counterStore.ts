import AsyncStorage from '@react-native-async-storage/async-storage'
import { isWindowDefined } from '@tamagui/constants'
import { create } from 'zustand'
import { devtools, persist, createJSONStorage } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import { fetchIdentityCount } from './fetchIdentityCount'

type statusLoading = 'idle' | 'loading' | 'failed'

interface CounterState {
  count: number
  amount: number
  loading: statusLoading
}

interface CounterAction {
  setAmount: (amount: number) => void
  increment: () => void
  decrement: () => void
  reset: () => void
  incrementByAmount: (by: number) => void
  incrementAsync: (by: number) => Promise<void>
  incrementIfOddAsync: (by: number) => void
}

const getDefaultState: CounterState = {
  count: 0,
  amount: 2,
  loading: 'idle',
}

export const useCounterStore = create<CounterState & CounterAction>()(
  immer(
    devtools(
      persist(
        (set, get) => ({
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
