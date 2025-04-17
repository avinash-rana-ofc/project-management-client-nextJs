// Store
'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'

import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector, useStore } from 'react-redux'



/* Store */

export const makeStore = () => {
  return configureStore({
    reducer: {},
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']



/* Hooks */

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<AppStore>()



/* Store Provider */

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const storeRef = useRef<AppStore>(undefined)
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore()
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}



/* Product Name */

export default function ProductName({ product }: { product: Product }) {
    // Initialize the store with the product information
    const store = useAppStore()
    const initialized = useRef(false)
    if (!initialized.current) {
      store.dispatch(initializeProduct(product))
      initialized.current = true
    }
    const name = useAppSelector((state) => state.product.name)
    const dispatch = useAppDispatch()
  
    return (
      <input
        value={name}
        onChange={(e) => dispatch(setProductName(e.target.value))}
      />
    )
  }