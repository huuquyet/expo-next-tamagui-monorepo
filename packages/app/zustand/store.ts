import { createContext, useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { isWindowDefined } from '@tamagui/constants'
import { createStore } from 'zustand'
import { useStoreWithEqualityFn } from 'zustand/traditional'
import { devtools, persist, createJSONStorage } from 'zustand/middleware'
import { shallow } from 'zustand/shallow'

import { fetchIdentityCount } from './fetchIdentityCount'

interface StoreInterface {
  lastUpdate: number
  count: number
  amount: number
  loading: 'idle' | 'loading' | 'failed'
  tick: (lastupdate: number) => void
  setAmount: (amount: number) => void
  increment: () => void
  decrement: () => void
  reset: () => void
  incrementByAmount: (by: number) => void
  incrementAsync: (by: number) => Promise<void>
  incrementIfOddAsync: (by: number) => void
}

const getDefaultInitialState = () => ({
  lastUpdate: Date.now(),
  count: 0,
  amount: 2,
  loading: 'idle' as const,
})

export type StoreType = ReturnType<typeof initializeStore>

const zustandContext = createContext<StoreType | null>(null)

export const Provider = zustandContext.Provider

export const useStore = <T>(selector: (state: StoreInterface) => T) => {
  const store = useContext(zustandContext)

  if (!store) throw new Error('Store is missing the provider')

  return useStoreWithEqualityFn(store, selector, shallow)
}

export const initializeStore = (preloadedState: Partial<StoreInterface> = {}) => {
  return createStore<StoreInterface>()(
    devtools(
      persist(
        (set, get) => ({
          ...getDefaultInitialState(),
          ...preloadedState,
          tick: (lastUpdate) => {
            set({
              lastUpdate,
            })
          },
          setAmount: (amount: number) => {
            set({ amount })
          },
          increment: () => {
            set({
              count: get().count + 1,
            })
          },
          decrement: () => {
            set({
              count: get().count - 1,
            })
          },
          reset: () => {
            set({
              count: getDefaultInitialState().count,
            })
          },
          incrementByAmount: (by: number) => {
            set({ count: get().count + by })
          },
          incrementAsync: async (by: number) => {
            set({ loading: 'loading' })
            const response = await fetchIdentityCount(by)
            set({ count: get().count + response.data })
            set({ loading: 'idle' })
          },
          incrementIfOddAsync: (by: number) => {
            const current = get().count
            if (current % 2 === 1) {
              get().incrementByAmount(by)
            }
          },
        }),
        {
          name: 'zustand',
          storage: createJSONStorage(() => (isWindowDefined ? window.localStorage : AsyncStorage)),
        }
      ),
      { enabled: false }
    )
  )
}

export const useClock = () => {
  return useStore((store) => ({
    lastUpdate: store.lastUpdate,
    tick: store.tick,
  }))
}

export const useCounter = () => {
  return useStore((store) => ({
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
