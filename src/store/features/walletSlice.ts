import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ContentViewE } from '../models/state-machine.types';

interface WalletState {
  currentView: ContentViewE | null;
  address: string;
  privateKey: string;
  balance: number;
  sentAmount: number;
  uTxids: string[];
  uTxHexs: Record<string, string>;
}

export const LocalStorageE = {
  walletAddress: 'walletAddress',
  privateKey: 'privateKey',
};

const initialState: WalletState = {
  currentView: ContentViewE.Welcome,
  address: '',
  privateKey: '',
  balance: 0,
  sentAmount: 0,
  uTxids: [],
  uTxHexs: {},
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
    setSentAmount(state, action: PayloadAction<number>) {
      state.sentAmount = action.payload;
    },
    setUTxids(state, action: PayloadAction<string[]>) {
      state.uTxids = action.payload;
    },
    setUTxHexs(state, action: PayloadAction<Record<string, string>>) {
      state.uTxHexs = { ...state.uTxHexs, ...action.payload };
    },
  },
});

export const {
  setCurrentView,
  setAddress,
  setPrivatKey,
  setBalance,
  setSentAmount,
  setUTxids,
  setUTxHexs,
} = walletSlice.actions;
export default walletSlice.reducer;
