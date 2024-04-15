import React, { FC } from 'react';

import styles from './input.module.css';
import classNames from 'classnames';

type InputType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'date'
  | 'url'
  | 'checkbox'
  | 'radio'
  | 'submit'
  | 'reset'
  | 'color'
  | 'search'
  | 'tel'
  | 'time'
  | 'range'
  | 'hidden';

interface InputProps {
  name: string;
  type?: InputType;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export const Input: FC<InputProps> = ({
  name,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  className,
}) => {
  return (
    <input
      id={name}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={classNames(styles.input, className)}
    />
  );
};
