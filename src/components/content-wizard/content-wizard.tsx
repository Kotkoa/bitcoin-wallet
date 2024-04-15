import type { FC } from 'react';
import { useSelector } from 'react-redux';

import { contentViews } from '@/store/models/state-machine.types';
import { RootState } from '@/store/store';

import styles from './content-wizard.module.css';

export const ContentWizard: FC = () => {
  const currentView = useSelector((state: RootState) => state.wallet.currentView);
  const ViewComponent = contentViews[currentView];

  if (!ViewComponent) {
    console.error(`No view available for state: ${currentView}`);
    return (
      <div className={styles.contentWrapper}>
        <p>No view available for this state.</p>
      </div>
    );
  }

  return (
    <div className={styles.contentWrapper}>
      <ViewComponent />
    </div>
  );
};
