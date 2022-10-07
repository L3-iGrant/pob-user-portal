import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import companyReducer from '../../src/views/company-views/companySlice';

export const store = configureStore({
  reducer: {
    company: companyReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
