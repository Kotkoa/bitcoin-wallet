import { type FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

import { createTransaction } from '@/hooks/create-transaction';
import { useValidateTransaction } from '@/hooks/validate';
import { setCurrentView, setSentAmount } from '@/store/features/walletSlice';
import { ContentViewE } from '@/store/models/state-machine.types';
import { useGetTransactionsQuery } from '@/store/services/query';
import { RootState } from '@/store/store';

import { Button } from '../button';
import { InnerWrapper } from '../inner-wrapper';
import { Input } from '../input';

import styles from './withdraw.module.css';

export const Withdraw: FC = () => {
  const dispatch = useDispatch();
  const [recipientAddress, setrRcipientAddress] = useState(
    'tb1qlj64u6fqutr0xue85kl55fx0gt4m4urun25p7q'
  );
  const [sendAmount, setSendAmount] = useState('0');
  const [error, setError] = useState<string | null>(null);
  const myAddress = useSelector((state: RootState) => state.wallet.address);
  const balance = useSelector((state: RootState) => state.wallet.balance);
  const privateKey = useSelector((state: RootState) => state.wallet.privateKey);

  const { data: utxos } = useGetTransactionsQuery(myAddress);

  console.log(utxos);

  // const {} = useSendTransactionMutation();

  const { isValid, error: validationError } = useValidateTransaction({
    recipientAddress,
    balance,
    sendAmount,
  });

  const handleChangeView = async () => {
    if (validationError) {
      setError(validationError);
      return;
    }
    if (utxos && isValid) {
      const { rawTx, sentAmount } = await createTransaction({
        myAddress,
        privateKey,
        recipientAddress,
        balance,
        sendAmount: parseFloat(sendAmount),
        utxos,
      });

      console.log('rawTx', rawTx, 'sentAmount', sentAmount);

      dispatch(setSentAmount(sentAmount));
    }
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
            setError(null);
            setSendAmount(e.target.value);
          }}
        />
        <div className={styles.alignLeft}>
          <p className={styles.address}>{myAddress}</p>
          <p className={styles.funds}>{sendAmount || 0} BTC</p>
          <p className={styles.fromBalance}>From balance {balance} BTC</p>
        </div>
        {error && <p className={styles.error}>{error}</p>}
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
