import { createContext, useContext } from 'react'
import { createStore, useStore as useZustandStore } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

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
  incrementAsync: (by: number) => void
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

  return useZustandStore(store, selector)
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
        { name: 'zustand' }
      )
    )
  )
}
