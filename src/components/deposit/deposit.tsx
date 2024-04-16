import { type FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DocumentDuplicateIcon } from '@heroicons/react/24/outline';

import { setCurrentView } from '@/store/features/walletSlice';
import { ContentViewE } from '@/store/models/state-machine.types';
import { RootState } from '@/store/store';

import { Button } from '../button';
import { InnerWrapper } from '../inner-wrapper';

import styles from './deposit.module.css';

export const Deposit: FC = () => {
  const dispatch = useDispatch();
  const [buttonLabel, setButtonLabel] = useState('Copy Address');
  const [counter, setCounter] = useState(0);

  const address = useSelector((state: RootState) => state.wallet.address);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    // Start the countdown if counter is greater than 0
    if (counter > 1) {
      timer = setTimeout(() => {
        setCounter((c) => c - 1);
      }, 1000);
    } else if (counter === 1) {
      dispatch(setCurrentView(ContentViewE.Wallet));
    }
    return () => clearTimeout(timer);
  }, [counter, dispatch, buttonLabel]);

  const handleCopy = async () => {
    try {
      if (!address) return;
      await navigator.clipboard.writeText(address);
      setButtonLabel('Copied');
      // Reset the button label after 3 seconds
      setTimeout(() => {
        setButtonLabel('Copy Address');
        setCounter(5);
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
        <p className={styles.header}>{address}</p>
        {counter > 0 && (
          <p className={styles.paragraph}>Return to the wallet page after {counter} sec</p>
        )}
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
