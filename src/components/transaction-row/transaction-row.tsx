import React, { FC } from 'react';

import { ArrowUpCircleIcon, CheckBadgeIcon } from '@heroicons/react/24/solid';

import { Transaction } from '@/store/models/state-machine.types';

import styles from './transaction-row.module.css';

interface TransactionProps {
  transaction: Transaction;
}

export const TransactionRow: FC<TransactionProps> = ({ transaction }) => {
  return (
    <div className={styles.transactionRoot}>
      <div className={styles.iconWrapper}>
        <ArrowUpCircleIcon width={24} height={24} className={styles.icon} />
      </div>
      <div className={styles.column}>
        <div className={styles.row}>
          <span className={styles.paragraph}>Recieved</span>
          <CheckBadgeIcon width={18} height={18} className={styles.check} />
        </div>
        <p className={styles.textAdderss}>From {transaction.txid}</p>
      </div>
      <p className={styles.amountBlock}>+0.001 BTC</p>
    </div>
  );
};
