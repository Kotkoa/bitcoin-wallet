import ecc from '@bitcoinerlab/secp256k1';
import * as bitcoin from 'bitcoinjs-lib';
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

export const FEE_RATE = 400;

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

  const keyPair = ECPairFactory(ecc).fromWIF(privateKey, TESTNET);
  const psbt = new bitcoin.Psbt({ network: TESTNET });
  debugger;

  let totalUtxoValue = 0;

  utxos.forEach((utxo, index) => {
    const rawTxHex = uTxHexs[utxo.txid];

    if (rawTxHex) {
      psbt.addInput({
        hash: utxo.txid,
        index: index,
        nonWitnessUtxo: Buffer.from(rawTxHex, 'hex'),
      });

      // collect all sats from vouts
      totalUtxoValue += utxo.vout
        .filter((item) => item.scriptpubkey_address === myAddress)
        .reduce((a, b) => a + b.value, 0);
    }
  });

  // avoid situations with 60000.0000000001 sats
  const amountSats = Math.floor(sendAmount * SATOSHY);
  const totalNeeded = amountSats + FEE_RATE;

  debugger;
  if (totalNeeded > totalUtxoValue) {
    throw new Error('Insufficient funds.');
  }

  psbt.addOutput({
    address: recipientAddress,
    value: amountSats,
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
