import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Transaction } from '../models/state-machine.types';

export const SATOSHY = 100000000;

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://blockstream.info/testnet/api/' }),
  endpoints: (builder) => ({
    getTransactions: builder.query<Transaction[], string>({
      query: (address) => `address/${address}/txs`,
      transformResponse: (response: Transaction[]) => {
        return response;
      },
    }),
    getBalance: builder.query<number, string>({
      query: (address) => `address/${address}`,
      transformResponse: (response: { chain_stats: { funded_txo_sum: number } }) =>
        response.chain_stats.funded_txo_sum / SATOSHY,
    }),
  }),
});

export const { useGetTransactionsQuery, useGetBalanceQuery } = api;
