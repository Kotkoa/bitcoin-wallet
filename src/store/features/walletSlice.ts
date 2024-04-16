import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ContentViewE, Transaction } from '../models/state-machine.types';

interface WalletState {
  currentView: ContentViewE | null;
  address: string | null;
  privateKey: string | null;
  balance: number;
  transactions: Transaction[];
}

export const LocalStorageE = {
  walletAddress: 'walletAddress',
  privateKey: 'privateKey',
};

const initialState: WalletState = {
  currentView: ContentViewE.Welcome,
  address: null,
  privateKey: null,
  balance: 0,
  transactions: [],
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setCurrentView(state, action: PayloadAction<ContentViewE>) {
      state.currentView = action.payload;
    },
    setAddress(state, action: PayloadAction<string>) {
      state.address = action.payload;
      if (action.payload) {
        localStorage.setItem(LocalStorageE.walletAddress, action.payload);
      }
    },
    setPrivatKey(state, action: PayloadAction<string>) {
      state.privateKey = action.payload;
      if (action.payload) {
        localStorage.setItem(LocalStorageE.privateKey, action.payload);
      }
    },
    setBalance(state, action: PayloadAction<number>) {
      state.balance = action.payload;
    },
    setTransactions(state, action: PayloadAction<Transaction[]>) {
      state.transactions = action.payload;
    },
    addTransaction(state, action: PayloadAction<Transaction>) {
      state.transactions.push(action.payload);
    },
  },
});

export const {
  setCurrentView,
  setAddress,
  setPrivatKey,
  setBalance,
  setTransactions,
  addTransaction,
} = walletSlice.actions;
export default walletSlice.reducer;
