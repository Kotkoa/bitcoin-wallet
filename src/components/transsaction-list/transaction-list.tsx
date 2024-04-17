import React, { FC } from 'react';

import { Transaction } from '@/store/models/state-machine.types';
import { useGetTransactionsQuery } from '@/store/services/query';

import { TransactionRow } from '../transaction';

interface TransactionListProps {
  walletAddress: string;
}

const pollingInterval = 600000; // 10 minutes

import styles from './transaction-list.module.css';

export const TransactionList: FC<TransactionListProps> = ({ walletAddress }) => {
  const {
    data: transactions,
    error: transactionsError,
    isLoading: loadingTransaction,
  } = useGetTransactionsQuery(walletAddress, {
    pollingInterval,
    skip: !walletAddress,
  });

  const isNoTransactions = !transactions || transactions.length === 0;

  if (transactionsError) {
    console.error('Failed to fetch transactions:', transactionsError);
    return <p className={styles.error}>{`Failed to fetch transactions, ${transactionsError}`}</p>;
  }

  if (isNoTransactions) {
    return <p className={styles.paragraph}>No transactions found, please send some BTC</p>;
  }

  if (loadingTransaction) {
    return <p className={styles.paragraph}>Loading...</p>;
  }

  return (
    <>
      {transactions.map((transaction: Transaction) => (
        <TransactionRow key={transaction.txid} transaction={transaction} />
      ))}
    </>
  );
};
