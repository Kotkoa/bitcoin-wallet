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

// interface StepConfig<StateType, StepNames extends string> {
//   canAdvance?: (currentState: StateType) => boolean;
//   choices: Partial<Record<StepNames, { when?: (currentState: StateType) => boolean }>>;
// }

// interface StateMachineConfig<StateType, StepNames extends string> {
//   initialStep: ContentViewE;
//   steps: Record<ContentViewE, StepConfig<StateType, ContentViewE>>;
// }

// export const stateMachineConfig = {
//   initialStep: ContentViewE.Welcome,
//   steps: {
//     [ContentViewE.Welcome]: {
//       choices: {
//         [ContentViewE.Wallet]: {
//           when: (state) => state.wallet !== null,
//         },
//       },
//     },
//     openWalletAndTransactions: {
//       choices: {
//         depositFunds: {},
//         withdrawFunds: {},
//       },
//     },
//     depositFunds: {
//       choices: {
//         openWalletAndTransactions: {},
//       },
//     },
//     withdrawFunds: {
//       choices: {
//         succesfulWithdraw: {},
//         openWalletAndTransactions: {},
//       },
//     },
//     succesfulWithdraw: {
//       choices: {},
//     },
//   },
// } satisfies StateMachineConfig<RootState, StepNames>;
