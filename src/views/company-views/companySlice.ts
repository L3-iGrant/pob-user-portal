import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { storedCertificatesApi } from 'services/company.rtk';
import { RootState } from '../../app/store';

export interface FetchStoredCertificates {
    isLoading: boolean,
    pollingInterval: number,
}

export interface CompanyState {
    walletDetail: string | undefined;
    walletConfiguration: string | undefined;
    fetchStoredCertificates: FetchStoredCertificates;
    walletEmpty: boolean,
};

const initialState: CompanyState = {
    walletDetail: undefined,
    walletConfiguration: undefined,
    fetchStoredCertificates: {
        isLoading: false,
        pollingInterval: 0
    },
    walletEmpty: true
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
        updateIsLoadingForFetchStoredCertificates: (state, action: PayloadAction<boolean>) => {
            state.fetchStoredCertificates.isLoading = action.payload
            if(action.payload){
                state.fetchStoredCertificates.pollingInterval = 3000
            } else {
                state.fetchStoredCertificates.pollingInterval = 0
            }
        },
        updateWalletEmpty: (state, action: PayloadAction<boolean>) => {
            state.walletEmpty = action.payload;
        },
    },
});

export const { updateWalletDetail, updateWalletConfiguration, updateIsLoadingForFetchStoredCertificates, updateWalletEmpty } = companySlice.actions;

export const selectWalletDetail = (state: RootState) => state.company.walletDetail;
export const selectWalletConfiguration = (state: RootState) => state.company.walletConfiguration;
export const selectFetchStoredCertificates = (state: RootState) => state.company.fetchStoredCertificates;
export const selectWalletEmpty = (state: RootState) => state.company.walletEmpty;

export default companySlice.reducer;