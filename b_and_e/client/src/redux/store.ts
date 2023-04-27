import { configureStore, MiddlewareArray } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import logger from 'redux-logger';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userSlice from './modules/userSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['users']
};

export const rootReducer = combineReducers({
  users: userSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: new MiddlewareArray().concat(logger)
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;