import type { FC, ReactNode } from 'react';

import styles from './inner-wrapper.module.css';

interface InnerWrapperProps {
  children: ReactNode;
}

export const InnerWrapper: FC<InnerWrapperProps> = ({ children }) => {
  return <div className={styles.innerWrapper}>{children}</div>;
};
