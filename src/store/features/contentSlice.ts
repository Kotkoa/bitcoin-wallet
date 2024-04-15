import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { StepNames } from '../models/state-machine.types';

interface ContentState {
  currentView: StepNames;
}

const getInitialStep = (): StepNames => {
  const walletExists = localStorage.getItem('wallet');
  return walletExists ? 'openWalletAndTransactions' : 'createWallet';
};

const initialState: ContentState = {
  currentView: getInitialStep(),
};

const contentSlice = createSlice({
  name: 'currentView',
  initialState,
  reducers: {
    // Use PayloadAction to type the action parameter
    setContentView: (state, action: PayloadAction<StepNames>) => {
      state.currentView = action.payload;
    },
    resetContentView: (state) => {
      state.currentView = getInitialStep();
    },
  },
});

export const { setContentView, resetContentView } = contentSlice.actions;
export default contentSlice.reducer;
