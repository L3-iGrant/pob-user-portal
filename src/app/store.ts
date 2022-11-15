import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import companyReducer from '../../src/views/company-views/companySlice';
import { storedCertificatesApi } from 'services/company.rtk';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

export const store = configureStore({
  reducer: {
    company: companyReducer,
    [storedCertificatesApi.reducerPath]: storedCertificatesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(storedCertificatesApi.middleware),
});

setupListeners(store.dispatch)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
