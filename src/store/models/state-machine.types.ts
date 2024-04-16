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

// export interface Transaction {
//   direction: 'reseived' | 'sent';
//   confirmed: boolean;
//   addressFrom: string;
//   amount: number;
// }

interface APIVin {
  txid: string;
  vout: number;
  prevout: {
    scriptpubkey_address: string;
    value: number; // In satoshis
  };
  scriptsig: string;
  scriptsig_asm: string;
  witness: string[];
  is_coinbase: boolean;
  sequence: number;
}

interface APIVout {
  scriptpubkey: string;
  scriptpubkey_asm: string;
  scriptpubkey_type: string;
  scriptpubkey_address: string;
  value: number; // In satoshis
}

export interface Transaction {
  txid: string;
  version: number;
  locktime: number;
  vin: APIVin[];
  vout: APIVout[];
  size: number;
  weight: number;
  fee: number;
  status: {
    confirmed: boolean;
    block_height: number;
    block_hash: string;
    block_time: number;
  };
}
