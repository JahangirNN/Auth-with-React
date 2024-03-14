import {configureStore, combineReducers} from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import themeReducer from './user/themeSlice';
import { applyMiddleware } from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { composeWithDevTools } from '@redux-devtools/extension';

const rootReducer = combineReducers({user: userReducer, theme:themeReducer});

const persistConfig = {
    key:'root',
    version: 1,
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer:persistedReducer,
    middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
        serializableCheck:false,
    }),
},composeWithDevTools(applyMiddleware()));

export const persistor = persistStore(store);