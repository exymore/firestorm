import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { CurrencyList, HistoricalRatesListItem } from '@/types/currency';

export const currencyApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    getCurrencyList: builder.query<CurrencyList, void>({
      query: () => 'currency/list',
    }),
    getLatestRates: builder.query<HistoricalRatesListItem, void>({
      query: () => 'currency/historical/latest',
    }),
  }),
});

export const { useGetCurrencyListQuery, useGetLatestRatesQuery } = currencyApi;
