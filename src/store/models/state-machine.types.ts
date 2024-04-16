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

export interface Transaction {
  direction: 'reseived' | 'sent';
  confirmed: boolean;
  addressFrom: string;
  amount: number;
}
