import { type FC, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

import { createTransaction } from '@/hooks/create-transaction';
import { useFetchTransactionHexes } from '@/hooks/get-tx-hex';
import { useValidateTransaction } from '@/hooks/validate';
import { setCurrentView, setSentAmount, setUTxids } from '@/store/features/walletSlice';
import { ContentViewE } from '@/store/models/state-machine.types';
import { useGetTransactionsQuery, useSendTransactionMutation } from '@/store/services/query';
import { RootState } from '@/store/store';
import { sliceAddress } from '@/utils/slice-address';

import { Button } from '../button';
import { InnerWrapper } from '../inner-wrapper';
import { Input } from '../input';

import styles from './withdraw.module.css';

export const Withdraw: FC = () => {
  const dispatch = useDispatch();
  const [recipientAddress, setrRcipientAddress] = useState('');
  const [sendAmount, setSendAmount] = useState('');
  const [error, setError] = useState<string | null>(null);
  const myAddress = useSelector((state: RootState) => state.wallet.address);
  const balance = useSelector((state: RootState) => state.wallet.balance);
  const privateKey = useSelector((state: RootState) => state.wallet.privateKey);
  const uTxHexs = useSelector((state: RootState) => state.wallet.uTxHexs);

  const { data: utxos } = useGetTransactionsQuery(myAddress);

  const uTxids = utxos?.map((utxo) => utxo.txid);

  useEffect(() => {
    if (uTxids) {
      dispatch(setUTxids(uTxids));
    }
  }, [dispatch, uTxids]);

  useFetchTransactionHexes(uTxids || []);

  const { isValid, error: validationError } = useValidateTransaction({
    recipientAddress,
    balance,
    sendAmount,
  });

  const [sendTransaction] = useSendTransactionMutation();

  const handleChangeView = useCallback(async () => {
    if (validationError) {
      setError(validationError);
      return;
    }

    if (utxos && isValid && Object.values(uTxHexs).length === utxos.length) {
      const { rawTx, sentAmount } = await createTransaction({
        myAddress,
        privateKey,
        recipientAddress,
        balance,
        sendAmount: parseFloat(sendAmount),
        utxos,
        uTxHexs,
      });

      await sendTransaction({ rawTx });

      dispatch(setSentAmount(sentAmount));
    }
    dispatch(setCurrentView(ContentViewE.SuccessWithdraw));
  }, [
    balance,
    dispatch,
    isValid,
    myAddress,
    privateKey,
    recipientAddress,
    sendAmount,
    sendTransaction,
    uTxHexs,
    utxos,
    validationError,
  ]);

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
          <p className={styles.address}>{sliceAddress(myAddress)}</p>
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
