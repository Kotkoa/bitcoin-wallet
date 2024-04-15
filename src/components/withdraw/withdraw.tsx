import { type FC, useState } from 'react';

import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

import { ContentTypeE } from '@/types/types';

import { Button } from '../button';
import { InnerWrapper } from '../inner-wrapper';
import { Input } from '../input';

import styles from './withdraw.module.css';

export const Withdraw: FC = () => {
  const [address, setAddress] = useState('');
  const [funds, setFunds] = useState('0,007');

  return (
    <>
      <h1 className={styles.header}>{ContentTypeE.Withdraw}</h1>
      <InnerWrapper>
        <Input
          name="address"
          placeholder="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <Input
          name="funds"
          value={funds}
          onChange={(e) => {
            setFunds(e.target.value);
          }}
        />
        <div className={styles.alignLeft}>
          <p className={styles.address}>bc1qxy...hx0wlh</p>
          <p className={styles.funds}>0,007 BTC</p>
          <p className={styles.fromBalance}>From balance 0,1 BTC</p>
        </div>
        <div className={styles.row}>
          <Button
            label="Send"
            icon={<PaperAirplaneIcon width={24} height={24} />}
            iconPlacement="right"
            onClick={() => {}}
          />
        </div>
      </InnerWrapper>
    </>
  );
};
