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
}

type createTransactionFunction = (props: SendTransactionProps) => Promise<string>;

const TESTNET = bitcoin.networks.testnet;
// const AUCTION_PRICE = 100000;
const FEE_RATE = 400;

export const createTransaction: createTransactionFunction = async ({
  // myAddress,
  privateKey,
  recipientAddress,
  // balance,
  sendAmount,
  utxos,
}) => {
  if (!privateKey || !utxos || !recipientAddress) throw new Error('Missing required parameters.');

  const ECPair = ECPairFactory(ecc);
  const keyPair = ECPair.fromWIF(privateKey, TESTNET);
  const sendAmountSat = Math.floor(sendAmount * SATOSHY);
  const psbt = new bitcoin.Psbt({ network: TESTNET });

  // const inputAmount = balance * SATOSHY;
  const neededAmount = sendAmountSat + FEE_RATE;
  // const publickKey = keyPair.publicKey;

  for (const utxo of utxos) {
    psbt.addInput({
      hash: utxo.txid,
      index: utxo.vout[0].value,
      nonWitnessUtxo: Buffer.from(utxo.txid, 'hex'),
    });
  }

  psbt.addOutput({
    address: recipientAddress,
    value: neededAmount,
  });

  // Sign all inputs with the private key
  utxos.forEach((utxo, index) => psbt.signInput(index, keyPair));

  psbt.finalizeAllInputs();
  const rawTx = psbt.extractTransaction().toHex();

  return rawTx;
};
