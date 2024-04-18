import type { FC } from 'react';
import { useDispatch } from 'react-redux';

import { createWallet } from '@/hooks/get-wallet';
import {
  LocalStorageE,
  setAddress,
  setCurrentView,
  setPrivatKey,
} from '@/store/features/walletSlice';
import { ContentViewE } from '@/store/models/state-machine.types';

import { Button } from '../button';
import { InnerWrapper } from '../inner-wrapper';

import styles from './welcome.module.css';

export const Welcome: FC = () => {
  const dispatch = useDispatch();

  const handleCreateWallet = () => {
    const data = createWallet();
    if (data && data.address) {
      const { address, privateKey } = data;

      localStorage.setItem(LocalStorageE.walletAddress, address);
      localStorage.setItem(LocalStorageE.walletAddress, privateKey);

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
