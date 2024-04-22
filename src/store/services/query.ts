import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BlockchainResponse, Transaction, UTransactionI } from '../models/state-machine.types';

export const SATOSHY = 100000000;

export const fetchTransactionHex = async (txid: string) => {
  const res = await fetch(`https://blockstream.info/testnet/api/tx/${txid}/hex`);
  return res.text();
};

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
    getUnspentTransactions: builder.query<UTransactionI[], string>({
      query: (address) => `address/${address}/utxo`,
      transformResponse: (response: UTransactionI[]) => {
        return response;
      },
    }),
    getBalance: builder.query<number, string>({
      query: (address) => `address/${address}`,
      transformResponse: (response: BlockchainResponse) => {
        const balance = response.chain_stats.spent_txo_sum / SATOSHY;
        return balance;
      },
    }),
    getTransactionInfo: builder.query<Record<string, string>, string>({
      query: (txid) => `tx/${txid}`,
      transformResponse: (response: Record<string, string>) => {
        return response;
      },
    }),
    getTransactionHex: builder.query<string, string>({
      query: (txid) => `tx/${txid}/hex`,
      transformResponse: (response: string) => {
        return response;
      },
    }),
    sendTransaction: builder.mutation<void, { rawTx: string }>({
      query: ({ rawTx: hex }) => ({
        url: `tx`,
        method: 'POST',
        body: hex,
      }),
    }),
  }),
});

export const {
  useGetTransactionsQuery,
  useGetUnspentTransactionsQuery,
  useGetBalanceQuery,
  useGetTransactionInfoQuery,
  useSendTransactionMutation,
  useGetTransactionHexQuery,
} = api;
