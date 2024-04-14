import type { FC } from 'react';

import { ArrowLeftCircleIcon } from '@heroicons/react/24/solid';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

import { ContentTypeE } from '@/types/types';

import { Button } from '../button';
import { InnerWrapper } from '../inner-wrapper';

import styles from './wallet.module.css';

export const Wallet: FC = () => {
  const isNoTransactions = true;

  return (
    <>
      <h1 className={styles.paragraph}>{ContentTypeE.Wallet}</h1>
      <div className={styles.row}>
        <p className={styles.header}>bc1qxy...hx0wlh</p>
        <button>copy to</button>
      </div>
      <p className={styles.fundsValue}>0 BTC</p>
      <div className={styles.row}>
        <Button
          label="Send"
          icon={<PaperAirplaneIcon width={24} height={24} />}
          onClick={() => {}}
        />
        <Button
          label="Deposit"
          icon={<ArrowLeftCircleIcon width={24} height={24} style={{ marginRight: '16px' }} />}
          onClick={() => {}}
        />
      </div>
      <InnerWrapper>
        <div className={styles.rowAlignLeft}>
          <h2 className={styles.headerSecondary}>Transaction history</h2>
        </div>
        {isNoTransactions && (
          <p className={styles.paragraph}>No transactions found, please send some BTC</p>
        )}
      </InnerWrapper>
    </>
  );
};
