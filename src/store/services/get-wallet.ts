import ecc from '@bitcoinerlab/secp256k1';
import * as bitcoin from 'bitcoinjs-lib';
import ECPairFactory from 'ecpair';

export interface WalletDetails {
  address: string;
  privateKey: string;
}

export const createWallet = () => {
  const ECPair = ECPairFactory(ecc);
  const TESTNET = bitcoin.networks.testnet;
  try {
    const keyPair = ECPair.makeRandom({ network: TESTNET });
    const { address } = bitcoin.payments.p2pkh({
      pubkey: keyPair.publicKey,
      network: TESTNET,
    });
    const privateKey = keyPair.toWIF();

    return { address, privateKey };
  } catch (error) {
    console.error('Error creating wallet:', error);
  }
};
