import { type FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

import { setCurrentView } from '@/store/features/walletSlice';
import { ContentViewE } from '@/store/models/state-machine.types';
import { RootState } from '@/store/store';

import { Button } from '../button';
import { InnerWrapper } from '../inner-wrapper';
import { Input } from '../input';

import styles from './withdraw.module.css';

export const Withdraw: FC = () => {
  const dispatch = useDispatch();
  const [recipientAddress, setrRcipientAddress] = useState('');
  const [sendAmount, setSendAmount] = useState('0');
  const address = useSelector((state: RootState) => state.wallet.address);
  const balance = useSelector((state: RootState) => state.wallet.balance);

  const handleChangeView = () => {
    dispatch(setCurrentView(ContentViewE.SuccessWithdraw));
  };

  return (
    <>
      <h1 className={styles.header}>Send BTC</h1>
      <InnerWrapper>
        <Input
          name="address"
          placeholder="Address"
          value={recipientAddress}
          onChange={(e) => setrRcipientAddress(e.target.value)}
        />
        <Input
          name="funds"
          value={sendAmount}
          onChange={(e) => {
            setSendAmount(e.target.value);
          }}
        />
        <div className={styles.alignLeft}>
          <p className={styles.address}>{address}</p>
          <p className={styles.funds}>{sendAmount} BTC</p>
          <p className={styles.fromBalance}>From balance {balance} BTC</p>
        </div>
        <div className={styles.row}>
          <Button
            label="Send"
            icon={<PaperAirplaneIcon width={24} height={24} />}
            iconPlacement="right"
            onClick={handleChangeView}
          />
        </div>
      </InnerWrapper>
    </>
  );
};
