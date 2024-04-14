import type { FC } from 'react';

import { ContentTypeE } from '@/types/types';

import { Button } from '../button';
import { InnerWrapper } from '../inner-wrapper';

import styles from './welcome.module.css';

export const Welcome: FC = () => {
  return (
    <>
      <h1 className={styles.header}>{ContentTypeE.Welcome}</h1>
      <InnerWrapper>
        <p className={styles.paragraph}>No wallets found, please create one</p>
        <Button label="Create Wallet" />
      </InnerWrapper>
    </>
  );
};
