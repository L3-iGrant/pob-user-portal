import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface CompanyState {
    walletDetail: string | undefined;
    walletConfiguration: string | undefined;
};

const initialState: CompanyState = {
    walletDetail: undefined,
    walletConfiguration: undefined,
};

export const companySlice = createSlice({
    name: 'company',
    initialState,
    reducers: {
        updateWalletDetail: (state, action: PayloadAction<string | undefined>) => {
            state.walletDetail = action.payload;
        },
        updateWalletConfiguration: (state, action: PayloadAction<string | undefined>) => {
            state.walletConfiguration = action.payload;
        },
    },
});

export const { updateWalletDetail, updateWalletConfiguration } = companySlice.actions;

export const selectWalletDetail = (state: RootState) => state.company.walletDetail;
export const selectWalletConfiguration = (state: RootState) => state.company.walletConfiguration;

export default companySlice.reducer;