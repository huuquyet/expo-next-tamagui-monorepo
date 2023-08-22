import { create, StateCreator } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import { fetchIdentityCount } from './fetchIdentityCount'

interface CounterSlice {
  value: number
  loading: 'idle' | 'loading' | 'failed'
}

const createCounterSlice: StateCreator<CounterSlice, [], []> = () => ({
  value: 0,
  loading: 'idle',
})

export const useBoundStore = create<CounterSlice>()(
  devtools(
    persist(
      (...a) => ({
        ...createCounterSlice(...a),
      }),
      { name: 'counter' }
    )
  )
)

export const increment = () => useBoundStore.setState((state) => ({ value: state.value + 1 }))
export const decrement = () => useBoundStore.setState((state) => ({ value: state.value - 1 }))
export const incrementByAmount = (amount: number) =>
  useBoundStore.setState((state) => ({ value: state.value + amount }))

export const incrementAsync = async (amount: number) => {
  useBoundStore.setState(() => ({ loading: 'loading' }))
  const response = await fetchIdentityCount(amount)
  useBoundStore.setState((state) => ({ value: state.value + response.data }))
  useBoundStore.setState(() => ({ loading: 'idle' }))
}

export const incrementIfOddAsync = (amount: number) => {
  const currentValue = useBoundStore.getState().value
  if (currentValue % 2 === 1) {
    incrementByAmount(amount)
  }
}
