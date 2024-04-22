import { Deposit } from '@/components/deposit';
import { SuccessWithdraw } from '@/components/success-withdraw';
import { Wallet } from '@/components/wallet';
import { Welcome } from '@/components/welcome';
import { Withdraw } from '@/components/withdraw';

export enum ContentViewE {
  Welcome = 'Welcome',
  Wallet = 'Wallet',
  Deposit = 'Deposit',
  Withdraw = 'Withdraw',
  SuccessWithdraw = 'Success',
}

export const contentViews = {
  [ContentViewE.Welcome]: Welcome,
  [ContentViewE.Wallet]: Wallet,
  [ContentViewE.Deposit]: Deposit,
  [ContentViewE.Withdraw]: Withdraw,
  [ContentViewE.SuccessWithdraw]: SuccessWithdraw,
};

// Interface for the PrevOut object within each vin
interface PrevOut {
  scriptpubkey: string;
  scriptpubkey_asm: string;
  scriptpubkey_type: string;
  scriptpubkey_address: string;
  value: number;
}

// Interface for each entry in the vin array
interface Vin {
  txid: string;
  vout: number;
  prevout: PrevOut;
  scriptsig: string;
  scriptsig_asm: string;
  witness: string[];
  is_coinbase: boolean;
  sequence: number;
}

// Interface for each entry in the vout array
interface Vout {
  scriptpubkey: string;
  scriptpubkey_asm: string;
  scriptpubkey_type: string;
  scriptpubkey_address: string;
  value: number;
}

// Interface for the status object in the transaction
interface TransactionStatus {
  confirmed: boolean;
  block_height: number;
  block_hash: string;
  block_time: number;
}

// Main transaction interface
export interface Transaction {
  txid: string;
  version: number;
  locktime: number;
  vin: Vin[];
  vout: Vout[];
  size: number;
  weight: number;
  fee: number;
  status: TransactionStatus;
}

export interface UTransactionI {
  txid: string;
  vout: number;
  status: TransactionStatus;
  value: number;
}

type BlockchainStats = {
  funded_txo_count: number;
  funded_txo_sum: number;
  spent_txo_count: number;
  spent_txo_sum: number;
  tx_count: number;
};

export type BlockchainResponse = {
  address: string;
  chain_stats: BlockchainStats;
  mempool_stats: BlockchainStats;
};
