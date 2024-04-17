import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ContentViewE } from '../models/state-machine.types';

interface WalletState {
  currentView: ContentViewE | null;
  address: string;
  privateKey: string | null;
  balance: number;
}

export const LocalStorageE = {
  walletAddress: 'walletAddress',
  privateKey: 'privateKey',
};

const initialState: WalletState = {
  currentView: ContentViewE.Welcome,
  address: '',
  privateKey: null,
  balance: 0,
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
  },
});

export const { setCurrentView, setAddress, setPrivatKey, setBalance } = walletSlice.actions;
export default walletSlice.reducer;
