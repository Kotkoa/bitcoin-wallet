import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setUTxHexs } from '@/store/features/walletSlice';
import { fetchTransactionHex } from '@/store/services/query';

export const useFetchTransactionHexes = async (txIds: string[]): Promise<void> => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchHexes = async () => {
      if (!txIds.length) return;

      try {
        const results = await Promise.all(txIds.map((txId) => fetchTransactionHex(txId)));

        results.forEach((hex, index) => {
          if (hex) {
            dispatch(setUTxHexs({ [txIds[index]]: hex }));
          }
        });
      } catch (err) {
        throw new Error('Failed to fetch transaction hexes.');
      }
    };

    fetchHexes();
  }, []);
};
