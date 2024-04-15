import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ContentViewE, Transaction } from '../models/state-machine.types';

interface WalletState {
  currentView: ContentViewE;
  address: string | null | undefined;
  privateKey: string | null;
  balance: number;
  transactions: Transaction[];
}

export const LocalStorageE = {
  walletAddress: 'walletAddress',
  privateKey: 'privateKey',
};

const loadWalletAddress = (): string | null => {
  if (typeof window !== 'undefined') {
    const localData = localStorage.getItem(LocalStorageE.walletAddress);
    console.log('localData', localData);
    return localData;
  } else {
    return null;
  }
};

const loadPrivateKey = (): string | null => {
  if (typeof window !== 'undefined') {
    const localData = localStorage.getItem(LocalStorageE.privateKey);
    return localData;
  } else {
    return null;
  }
};

const walletAddress = loadWalletAddress();
const privateKey = loadPrivateKey();
const isAddressExist = walletAddress !== null;

const initialState: WalletState = {
  currentView: isAddressExist ? ContentViewE.Wallet : ContentViewE.Welcome,
  address: walletAddress,
  privateKey: privateKey,
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
      localStorage.setItem(LocalStorageE.walletAddress, action.payload);
    },
    setPrivatKey(state, action: PayloadAction<string>) {
      state.privateKey = action.payload;
      localStorage.setItem(LocalStorageE.privateKey, action.payload);
    },
    setBalance(state, action: PayloadAction<number>) {
      state.balance = action.payload;
    },
    addTransaction(state, action: PayloadAction<Transaction>) {
      state.transactions.push(action.payload);
    },
  },
});

export const { setCurrentView, setAddress, setPrivatKey, setBalance, addTransaction } =
  walletSlice.actions;
export default walletSlice.reducer;
