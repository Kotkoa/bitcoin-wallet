import { type FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DocumentDuplicateIcon } from '@heroicons/react/24/outline';
import { ArrowLeftCircleIcon } from '@heroicons/react/24/solid';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

import { setBalance, setCurrentView } from '@/store/features/walletSlice';
import { ContentViewE } from '@/store/models/state-machine.types';
import { useGetBalanceQuery } from '@/store/services/query';
import { RootState } from '@/store/store';
import { sliceAddress } from '@/utils/slice-address';

import { Button } from '../button';
import { InnerWrapper } from '../inner-wrapper';
import { TransactionList } from '../transsaction-list';

import styles from './wallet.module.css';

export const Wallet: FC = () => {
  const dispatch = useDispatch();
  const address = useSelector((state: RootState) => state.wallet.address);

  const { data: balance, error: balanceError } = useGetBalanceQuery(address, {
    skip: !address,
  });

  useEffect(() => {
    if (balance) {
      dispatch(setBalance(balance));
    }
  }, [balance, dispatch]);

  useEffect(() => {
    if (balanceError) {
      console.error('Failed to fetch balance:', balanceError);
    }
  }, [balanceError]);

  const copyToClipboard = () => {
    if (!address) return;
    navigator.clipboard.writeText(address);
  };

  const handleWithdrawFunds = () => {
    dispatch(setCurrentView(ContentViewE.Withdraw));
  };

  const handleDepositFunds = () => {
    dispatch(setCurrentView(ContentViewE.Deposit));
  };

  return (
    <>
      <h1 className={styles.paragraph}>Your Bitcoin address</h1>
      <div className={styles.row}>
        <p className={styles.header}>{sliceAddress(address)}</p>
        <Button
          label=""
          icon={<DocumentDuplicateIcon width={24} height={24} />}
          onClick={copyToClipboard}
          className={styles.buttonCopy}
        />
      </div>
      <p className={styles.fundsValue}>{balance || 0} BTC</p>
      <div className={styles.row}>
        <Button
          label="Send"
          icon={<PaperAirplaneIcon width={24} height={24} />}
          onClick={handleWithdrawFunds}
        />
        <Button
          label="Deposit"
          icon={<ArrowLeftCircleIcon width={24} height={24} style={{ marginRight: '16px' }} />}
          onClick={handleDepositFunds}
        />
      </div>
      <InnerWrapper>
        <div className={styles.rowAlignLeft}>
          <h2 className={styles.headerSecondary}>Transaction history</h2>
        </div>
        <TransactionList walletAddress={address} />
      </InnerWrapper>
    </>
  );
};
