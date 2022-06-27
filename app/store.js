import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { bridgeApi } from './bridgeApi'
import counterReducer from './counterSlice'
import ipfsReduxReducer from './ipfsSlice'
import themeSliceReducer from './themeSlice'



export const store = configureStore({
  reducer: {
    counter: counterReducer,
    ipfsRedux: ipfsReduxReducer,
    theme: themeSliceReducer,
    [bridgeApi.reducerPath]: bridgeApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }).concat(bridgeApi.middleware),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)
