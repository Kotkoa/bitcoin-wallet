import type { FC, ReactNode } from 'react';

import styles from './button.module.css';
import classNames from 'classnames';

interface ButtonProps {
  icon?: ReactNode;
  iconPlacement?: 'left' | 'right';
  label: string;
  className?: string;
  onClick?: () => void;
}

export const Button: FC<ButtonProps> = ({
  icon,
  iconPlacement = 'left',
  label,
  className,
  onClick,
}) => {
  return (
    <button className={classNames(styles.button, className)} onClick={onClick}>
      {iconPlacement === 'left' && icon}
      {label}
      {iconPlacement === 'right' && icon}
    </button>
  );
};
