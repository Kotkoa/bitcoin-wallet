import { initializeWallet } from '../features/walletSlice';
import { AppThunk } from '../store';

export interface Transaction {
  direction: 'reseived' | 'sent';
  confirmed: boolean;
  addressFrom: string;
  amount: number;
}

export const fetchWalletData =
  (address: string): AppThunk =>
  async (dispatch) => {
    try {
      const response = await fetch(`https://api.example.com/wallet?address=${address}`);
      const data = await response.json();
      dispatch(
        initializeWallet({
          address: address,
          balance: data.balance,
          transactions: data.transactions.map((transaction: Transaction) => ({
            direction: transaction.direction,
            confirmed: transaction.confirmed,
            addressFrom: transaction.addressFrom,
            amount: transaction.amount,
          })),
        })
      );
    } catch (error) {
      console.error('Failed to fetch wallet data:', error);
    }
  };
