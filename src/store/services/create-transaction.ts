// import ecc from '@bitcoinerlab/secp256k1';
import * as bitcoin from 'bitcoinjs-lib';
// import ECPairFactory from 'ecpair';

// import { SATOSHY } from './query';

interface SendTransactionProps {
  address: string;
  recipientAddress: string;
  sendAmount: number;
  privateKey: string;
}

type createTransactionFunction = (props: SendTransactionProps) => Promise<void>;

const TESTNET = bitcoin.networks.testnet;

export const createTransaction: createTransactionFunction = async ({
  // address,
  // privateKey,
  recipientAddress,
  sendAmount,
}) => {
  // const ECPair = ECPairFactory(ecc);
  // const network = bitcoin.networks.testnet;
  // const keyPair = ECPair.fromWIF(privateKey, network);
  // const fee = 0.000004;

  const psbt = new bitcoin.Psbt({ network: TESTNET });

  const txid = '814897d7506345b3d68bc0c10f5867a199c33cda9af10d634a57bcaecedc9e4c'; // Get from API

  const rawTx =
    '020000000001015df950ad7bd9fcbeab0e627de182e2843dc7189857a1688725f5299201f2413e0100000000feffffff0210270000000000001976a9145a2bb3413cdebf9ea10f2420ac34f6af63f3156188acd59b17ba00000000160014793342bf134cea3dc716b15023c0e5fe3e5fccaa024730440220511ed34d0f94b65ca0246d357010cdbaf894bd7b0b2255967e0c8b1dd4c7d26c0220019810146d6f54e7c3cd09836d8bbdf54441b3614a78d62dbf63ae0d4a2ccceb012103429c0684a03ea44c84e0f3060feb20e059ec6f1a33693593688491077a523927bb212000';

  const index = 0; // Get from API

  psbt.addInput({
    hash: txid,
    index: index,
    nonWitnessUtxo: Buffer.from(rawTx, 'hex'),
  });

  psbt.addOutput({
    address: recipientAddress,
    value: sendAmount,
  });

  // psbt.signInput(0, keypair);

  psbt.finalizeAllInputs();

  const transactionHex = psbt.extractTransaction().toHex();

  console.log({ transactionHex });
};
