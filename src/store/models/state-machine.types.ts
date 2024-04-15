import { Deposit } from '@/components/deposit';
import { SuccessWithdraw } from '@/components/success-withdraw';
import { Wallet } from '@/components/wallet';
import { Welcome } from '@/components/welcome';
import { Withdraw } from '@/components/withdraw';

import { RootState } from '../store';

export type StepNames =
  | 'createWallet'
  | 'openWalletAndTransactions'
  | 'depositFunds'
  | 'withdrawFunds'
  | 'succesfulWithdraw';

interface StepConfig<StateType, StepNames extends string> {
  canAdvance?: (currentState: StateType) => boolean;
  choices: Partial<Record<StepNames, { when?: (currentState: StateType) => boolean }>>;
}

interface StateMachineConfig<StateType, StepNames extends string> {
  initialStep: StepNames | (() => StepNames);
  steps: Record<StepNames, StepConfig<StateType, StepNames>>;
  views: Record<StepNames, React.ComponentType>;
}

export const stateMachineConfig = {
  initialStep: 'createWallet',
  steps: {
    createWallet: {
      choices: {
        openWalletAndTransactions: {
          when: (state) => state.wallet !== null,
        },
      },
    },
    openWalletAndTransactions: {
      choices: {
        depositFunds: {},
        withdrawFunds: {},
      },
    },
    depositFunds: {
      choices: {
        openWalletAndTransactions: {},
      },
    },
    withdrawFunds: {
      choices: {
        succesfulWithdraw: {},
        openWalletAndTransactions: {},
      },
    },
    succesfulWithdraw: {
      choices: {},
    },
  },
  views: {
    createWallet: Welcome,
    openWalletAndTransactions: Wallet,
    depositFunds: Deposit,
    withdrawFunds: Withdraw,
    succesfulWithdraw: SuccessWithdraw,
  },
} satisfies StateMachineConfig<RootState, StepNames>;
