import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import ApiRouteConfig from 'configs/ApiRouteConfig'
import { API_BASE_URL } from 'configs/AppConfig'
import { ListCertificatesResponse } from 'interfaces/listcertificatesresponse'
import axiosService from 'services/axiosService'
import { updateIsLoadingForFetchStoredCertificates, updateWalletEmpty } from 'views/company-views/companySlice'


export const storedCertificatesApi = createApi({
    reducerPath: 'storedCertificateApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_BASE_URL,
        prepareHeaders: (headers) => {
            const token = axiosService.getAuthToken()
            if (token) {
                const isKeycloakToken = token.split('.').length === 3;
                const prefix = isKeycloakToken ? 'Bearer' : 'Token';
                headers.set('authorization', `${prefix} ${token}`);
            }
            return headers
        },
    }),
    endpoints: (builder) => ({
        listStoredCertificates: builder.query<any, any>({
            query: () => `${ApiRouteConfig.getCertificates}`,
            transformResponse: (response: { data: ListCertificatesResponse }) => {
                return response
            },
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    if (data.results!.length > 0) {
                        dispatch(updateIsLoadingForFetchStoredCertificates(false))
                        dispatch(updateWalletEmpty(false))
                    } else {
                        dispatch(updateWalletEmpty(true))
                    }
                } catch (err) {
                    console.log(err);
                }
            }
        }),
    }),
})

export const { useListStoredCertificatesQuery } = storedCertificatesApi