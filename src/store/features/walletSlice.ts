import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Transaction } from '../services/get-wallet';

interface WalletState {
  address: string | null | undefined; // Store only address in local storage
  balance: number;
  transactions: Transaction[];
}
// Load the initial state from localStorage if available
const loadWalletAddress = (): string | null | undefined => {
  return localStorage.getItem('walletAddress');
};

const initialState: WalletState = {
  address: loadWalletAddress(),
  balance: 0,
  transactions: [],
};

//Save to localStore only address
export const saveStateToLocalStorage = (address: WalletState['address']) => {
  try {
    const serializedState = JSON.stringify(address);

    localStorage.setItem('wallet', serializedState);
  } catch (err) {
    console.error('Could not save state', err);
  }
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setAddress(state, action: PayloadAction<string>) {
      state.address = action.payload;
      localStorage.setItem('walletAddress', action.payload);
    },
    setBalance(state, action: PayloadAction<number>) {
      state.balance = action.payload;
    },
    addTransaction(state, action: PayloadAction<Transaction>) {
      state.transactions.push(action.payload);
    },
    initializeWallet(
      state,
      action: PayloadAction<{ address: string; balance: number; transactions: Transaction[] }>
    ) {
      state.address = action.payload.address;
      state.balance = action.payload.balance;
      state.transactions = action.payload.transactions;
      localStorage.setItem('walletAddress', action.payload.address);
    },
  },
});

export const { setAddress, setBalance, addTransaction, initializeWallet } = walletSlice.actions;
export default walletSlice.reducer;
