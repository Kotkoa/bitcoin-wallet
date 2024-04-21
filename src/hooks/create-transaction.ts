import ecc from '@bitcoinerlab/secp256k1';
import * as bitcoin from 'bitcoinjs-lib';
// import bitcore from 'bitcore-lib';
import ECPairFactory from 'ecpair';

import { Transaction } from '@/store/models/state-machine.types';
import { SATOSHY } from '@/store/services/query';

interface SendTransactionProps {
  myAddress: string;
  recipientAddress: string;
  balance: number;
  sendAmount: number;
  privateKey: string | null;
  utxos: Transaction[] | undefined;
  uTxHexs: Record<string, string>;
}

type createTransactionFunction = (
  props: SendTransactionProps
) => Promise<{ rawTx: string; sentAmount: number }>;

const TESTNET = bitcoin.networks.testnet;

const FEE_RATE = 400;

export const createTransaction: createTransactionFunction = async ({
  myAddress,
  privateKey,
  recipientAddress,
  sendAmount,
  utxos,
  uTxHexs,
}) => {
  if (!privateKey || !utxos || utxos.length === 0 || !recipientAddress) {
    throw new Error('Missing or invalid parameters.');
  }

  console.log(
    'utxos',
    utxos,
    'uTxHexs',
    uTxHexs,
    'privateKey',
    privateKey,
    'recipientAddress',
    recipientAddress,
    'sendAmount',
    sendAmount,
    'myAddress',
    myAddress
  );

  const keyPair = ECPairFactory(ecc).fromWIF(privateKey, TESTNET);
  const psbt = new bitcoin.Psbt({ network: TESTNET });

  let totalUtxoValue = 0;

  utxos.forEach((utxo) => {
    const rawTxHex = uTxHexs[utxo.txid];

    if (rawTxHex) {
      psbt.addInput({
        hash: utxo.txid,
        index: 0,
        nonWitnessUtxo: Buffer.from(rawTxHex, 'hex'),
      });

      totalUtxoValue += utxo.vout[0].value;
    }
  });

  const totalNeeded = sendAmount * SATOSHY + FEE_RATE;

  if (totalNeeded > totalUtxoValue) {
    throw new Error('Insufficient funds.');
  }

  psbt.addOutput({
    address: recipientAddress,
    value: Math.floor(sendAmount * SATOSHY),
  });

  const changeValue = totalUtxoValue - totalNeeded;

  if (changeValue > 0) {
    psbt.addOutput({
      address: myAddress,
      value: changeValue,
    });
  }

  utxos.forEach((_, index) => {
    psbt.signInput(index, keyPair);
  });

  psbt.finalizeAllInputs();

  const rawTx = psbt.extractTransaction().toHex();

  const sentAmount = totalNeeded / SATOSHY;

  return { rawTx, sentAmount };
};
