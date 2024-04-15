import type { FC } from 'react';

import { DocumentDuplicateIcon } from '@heroicons/react/24/outline';

import { Button } from '../button';
import { InnerWrapper } from '../inner-wrapper';

import styles from './deposit.module.css';

export const Deposit: FC = () => {
  return (
    <div>
      <h1 className={styles.paragraph}>Deposit BTC</h1>
      <InnerWrapper>
        <div className={styles.row}>
          <p className={styles.paragraph}>Your Bitcoin address</p>
        </div>
        <p className={styles.header}>bc1qxy...hx0wlh</p>
        <div className={styles.row}>
          <Button
            label="Copy Address"
            icon={<DocumentDuplicateIcon width={24} height={24} style={{ marginRight: '16px' }} />}
            iconPlacement="right"
            onClick={() => {}}
          />
        </div>
      </InnerWrapper>
    </div>
  );
};
