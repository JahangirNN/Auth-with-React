import {configureStore} from '@reduxjs/toolkit';
import useReducer from './user/userSlice';
import { applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';


export const store = configureStore({
    reducer:{user: useReducer},
    middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
        serializableCheck:false,
    }),
},composeWithDevTools(applyMiddleware()));