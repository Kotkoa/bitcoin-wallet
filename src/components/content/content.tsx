import type { FC } from 'react';

import { ContentTypeE } from '@/types/types';

import { Deposit } from '../deposit';
import { SuccessWithdraw } from '../success-withdraw';
import { Wallet } from '../wallet';
import { Welcome } from '../welcome';
import { Withdraw } from '../withdraw';

import styles from './content.module.css';

interface ContentProps {
  view: ContentTypeE;
}

const contentViews = {
  [ContentTypeE.Welcome]: <Welcome />,
  [ContentTypeE.Wallet]: <Wallet />,
  [ContentTypeE.Deposit]: <Deposit />,
  [ContentTypeE.Withdraw]: <Withdraw />,
  [ContentTypeE.SuccessWithdraw]: <SuccessWithdraw />,
};

export const Content: FC<ContentProps> = ({ view }) => {
  return <div className={styles.contentWrapper}>{contentViews[view]}</div>;
};
