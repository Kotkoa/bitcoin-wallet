import { type FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  LocalStorageE,
  setAddress,
  setCurrentView,
  setPrivatKey,
} from '@/store/features/walletSlice';
import { ContentViewE, contentViews } from '@/store/models/state-machine.types';
import { RootState } from '@/store/store';

import styles from './content-wizard.module.css';

export const ContentWizard: FC = () => {
  const dispatch = useDispatch();
  const currentView = useSelector((state: RootState) => state.wallet.currentView);
  const address = useSelector((state: RootState) => state.wallet.address);
  const privatKey = useSelector((state: RootState) => state.wallet.privateKey);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const addressFromLocalStorage = localStorage.getItem(LocalStorageE.walletAddress);
      const privateKeyFromLocalStorage = localStorage.getItem(LocalStorageE.privateKey);

      if (addressFromLocalStorage && !address) {
        dispatch(setAddress(addressFromLocalStorage));
      }
      if (privateKeyFromLocalStorage && !privatKey) {
        dispatch(setPrivatKey(privateKeyFromLocalStorage));
      }

      if (addressFromLocalStorage && currentView === ContentViewE.Welcome) {
        dispatch(setCurrentView(ContentViewE.Wallet));
      }
    }
  }, [address, currentView, dispatch, privatKey]);

  if (!currentView) {
    console.error(`No view available for state: ${currentView}`);
    return (
      <div className={styles.contentWrapper}>
        <p>No view available for this state.</p>
      </div>
    );
  }
  const ViewComponent = contentViews[currentView];

  return (
    <div className={styles.contentWrapper}>
      <ViewComponent />
    </div>
  );
};
