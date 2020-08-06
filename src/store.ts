import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { createLogger } from 'redux-logger';
import rootReducer from './reducers'

const loggerMiddleware = createLogger();

const persistConfig = {
	key: 'root',
	storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)


const store = createStore(
	persistedReducer,
	applyMiddleware(
		thunkMiddleware,
		loggerMiddleware
	)
);

const persistor = persistStore(store)
export default { store, persistor }


