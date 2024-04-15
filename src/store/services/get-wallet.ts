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
    const privateKey = keyPair.toWIF(); // Get the private key in Wallet Import Format

    console.log('New Bitcoin Address:', address);
    console.log('Private Key:', privateKey);

    if (address) {
      localStorage.setItem('walletAddress', address);
      localStorage.setItem('privateKey', privateKey);
    }

    return { address, privateKey };
  } catch (error) {
    console.error('Error creating wallet:', error);
  }
};
