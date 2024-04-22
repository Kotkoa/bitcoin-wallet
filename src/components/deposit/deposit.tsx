import { type FC, useState } from 'react';
import { useSelector } from 'react-redux';

import { DocumentDuplicateIcon } from '@heroicons/react/24/outline';

import { RootState } from '@/store/store';
import { sliceAddress } from '@/utils/slice-address';

import { Button } from '../button';
import { InnerWrapper } from '../inner-wrapper';

import styles from './deposit.module.css';

export const Deposit: FC = () => {
  const [buttonLabel, setButtonLabel] = useState('Copy Address');

  const address = useSelector((state: RootState) => state.wallet.address);

  const handleCopy = async () => {
    try {
      if (!address) return;
      await navigator.clipboard.writeText(address);
      setButtonLabel('Copied');

      setTimeout(() => {
        setButtonLabel('Copy Address');
      }, 3000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <>
      <h1 className={styles.paragraph}>Deposit BTC</h1>
      <InnerWrapper>
        <div className={styles.row}>
          <p className={styles.paragraph}>Your Bitcoin address</p>
        </div>
        <p className={styles.header}>{sliceAddress(address)}</p>
        <div className={styles.row}>
          <Button
            label={buttonLabel}
            icon={
              Boolean(buttonLabel === 'Copy Address') ? (
                <DocumentDuplicateIcon width={24} height={24} style={{ marginRight: '16px' }} />
              ) : (
                ''
              )
            }
            iconPlacement="right"
            onClick={handleCopy}
          />
        </div>
      </InnerWrapper>
    </>
  );
};
