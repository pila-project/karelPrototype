import { applyMiddleware, createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { composeWithDevTools } from 'redux-devtools-extension'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import { logActions } from "./middleware/index"

const persistConfig = {
    key: 'root',
    storage: storage,
    blacklist: ['autofillUserId']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default function configureStore(preloadedState) {
  const middlewares = [logger, thunk, logActions]
  const middlewareEnhancer = applyMiddleware(...middlewares)
  const enhancers = [middlewareEnhancer]
  const composedEnhancers = composeWithDevTools(...enhancers)
  const store = createStore(persistedReducer, preloadedState, composedEnhancers)
  let persistor = persistStore(store)
  return { store, persistor }
}
