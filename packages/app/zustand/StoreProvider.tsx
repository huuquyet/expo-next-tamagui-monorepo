import { type PropsWithChildren, useRef } from 'react'

import { initializeStore, Provider, type StoreType } from './store'

export const StoreProvider = ({ children, ...props }: PropsWithChildren) => {
  const storeRef = useRef<StoreType>()

  if (!storeRef.current) {
    storeRef.current = initializeStore(props)
  }

  return <Provider value={storeRef.current}>{children}</Provider>
}
