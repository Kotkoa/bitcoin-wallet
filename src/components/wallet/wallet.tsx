import { type FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DocumentDuplicateIcon } from '@heroicons/react/24/outline';
import { ArrowLeftCircleIcon } from '@heroicons/react/24/solid';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

import { setCurrentView } from '@/store/features/walletSlice';
import { ContentViewE } from '@/store/models/state-machine.types';
import { RootState } from '@/store/store';

import { Button } from '../button';
import { InnerWrapper } from '../inner-wrapper';

import styles from './wallet.module.css';

export const Wallet: FC = () => {
  const dispatch = useDispatch();
  const address = useSelector((state: RootState) => state.wallet.address);
  const balance = useSelector((state: RootState) => state.wallet.balance);
  const transactions = useSelector((state: RootState) => state.wallet.transactions);

  const [isClient, setIsClient] = useState(false);
  const isNoTransactions = !transactions.length;

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

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return <div>Loading...</div>;

  return (
    <>
      <h1 className={styles.paragraph}>Your Bitcoin address</h1>
      <div className={styles.row}>
        <p className={styles.header}>{address}</p>
        <Button
          label=""
          icon={<DocumentDuplicateIcon width={24} height={24} />}
          onClick={copyToClipboard}
          className={styles.buttonCopy}
        />
      </div>
      <p className={styles.fundsValue}>{`${balance} BTC`}</p>
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
        {isNoTransactions && (
          <p className={styles.paragraph}>No transactions found, please send some BTC</p>
        )}
      </InnerWrapper>
    </>
  );
};
