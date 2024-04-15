import type { FC } from 'react';

import { Button } from '../button';
import { InnerWrapper } from '../inner-wrapper';

import styles from './success-withdraw.module.css';

export const SuccessWithdraw: FC = () => {
  return (
    <div>
      <h1 className={styles.header}>Success !</h1>
      <InnerWrapper>
        <p className={styles.paragraph}>Bitcoins sent!</p>
        <p className={styles.funds}>0,007 BTC</p>
        <p className={styles.fromAddress}>bc1qxy...hx0wlh</p>
        <Button label="Back" onClick={() => {}} />
      </InnerWrapper>
    </div>
  );
};
