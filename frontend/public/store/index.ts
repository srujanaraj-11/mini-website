import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import stockReducer from '../store/stockSlice';

export const store = configureStore({
  reducer: {
    stock: stockReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
