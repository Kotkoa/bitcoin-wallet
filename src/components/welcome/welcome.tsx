import type { FC } from 'react';
import { useDispatch } from 'react-redux';

import { setAddress, setCurrentView, setPrivatKey } from '@/store/features/walletSlice';
import { ContentViewE } from '@/store/models/state-machine.types';
import { createWallet } from '@/store/services/get-wallet';

import { Button } from '../button';
import { InnerWrapper } from '../inner-wrapper';

import styles from './welcome.module.css';

export const Welcome: FC = () => {
  const dispatch = useDispatch();

  const handleCreateWallet = () => {
    const data = createWallet();
    if (data && data.address) {
      const { address, privateKey } = data;
      dispatch(setAddress(address));
      dispatch(setPrivatKey(privateKey));
      dispatch(setCurrentView(ContentViewE.Wallet));
    }
  };

  return (
    <>
      <h1 className={styles.header}>Welcome</h1>
      <InnerWrapper>
        <p className={styles.paragraph}>No wallets found, please create one</p>
        <Button label="Create Wallet" onClick={handleCreateWallet} />
      </InnerWrapper>
    </>
  );
};
