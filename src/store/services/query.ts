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
      transformResponse: (response: { chain_stats: { funded_txo_sum: number } }) => {
        const balance = response.chain_stats.funded_txo_sum / SATOSHY;
        return balance;
      },
    }),
    getTransactionInfo: builder.query<Record<string, string>, string>({
      query: (txid) => `tx/${txid}`,
      transformResponse: (response: Record<string, string>) => {
        return response;
      },
    }),
    sendTransaction: builder.mutation<void, { txid: string; hex: string }>({
      query: ({ txid, hex }) => ({
        url: `tx/${txid}`,
        method: 'POST',
        body: { hex },
      }),
      transformResponse: (baseQueryReturnValue: unknown) => {
        const data = JSON.parse(baseQueryReturnValue as string);
        console.log('Processed data:', data);
        return data;
      },
    }),
  }),
});

export const {
  useGetTransactionsQuery,
  useGetBalanceQuery,
  useGetTransactionInfoQuery,
  useSendTransactionMutation,
} = api;
