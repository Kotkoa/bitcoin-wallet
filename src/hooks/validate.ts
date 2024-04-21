import { useEffect, useState } from 'react';

import { SATOSHY } from '@/store/services/query';

interface ValidateTransactionProps {
  recipientAddress: string;
  sendAmount: string;
  balance: number;
  minFee?: number;
}

const DUST = 546;

export const useValidateTransaction = ({
  recipientAddress,
  balance,
  sendAmount,
  minFee = 0.000004,
}: ValidateTransactionProps): {
  isValid: boolean;
  error: string | null;
} => {
  const [isValid, setIsValid] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    validateTransaction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipientAddress, sendAmount, balance]);

  const validateTransaction = () => {
    // Reset validation state
    setIsValid(true);
    setError(null);

    // Validate recipient address
    if (!recipientAddress) {
      setError('Enter recipient address.');
      setIsValid(false);
      return;
    }

    // Convert send amount to a number and calculate total amount including the fee
    const amountToSend = parseFloat(sendAmount);
    if (isNaN(amountToSend) || amountToSend <= 0) {
      setError('Invalid amount to send.');
      setIsValid(false);
      return;
    }

    // Check if the balance covers the send amount plus the miner fee
    if (balance < amountToSend + minFee) {
      setError('Insufficient funds to complete the transaction.');
      setIsValid(false);
      return;
    }

    if (amountToSend * SATOSHY < DUST) {
      setError('Bitcoin dust transaction. Amount is too small.');
      setIsValid(false);
      return;
    }
  };

  return { isValid, error };
};
