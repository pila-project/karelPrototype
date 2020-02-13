import { applyMiddleware, createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { composeWithDevTools } from 'redux-devtools-extension'
import logger from 'redux-logger'
import rootReducer from './reducers'

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default function configureStore(preloadedState) {
  const middlewares = [logger]
  const middlewareEnhancer = applyMiddleware(...middlewares)
  const enhancers = [middlewareEnhancer]
  const composedEnhancers = composeWithDevTools(...enhancers)
  const store = createStore(persistedReducer, preloadedState, composedEnhancers)
  let persistor = persistStore(store)
  return { store, persistor }
}