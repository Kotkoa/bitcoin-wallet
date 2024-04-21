import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setUTxHexs } from '@/store/features/walletSlice';

export const useFetchTransactionHexes = async (txIds: string[]): Promise<void> => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchHexes = async () => {
      if (!txIds.length) return;

      try {
        const results = await Promise.all(
          txIds.map((txId) =>
            fetch(`https://blockstream.info/testnet/api/tx/${txId}/hex`).then((res) => {
              return res.text();
            })
          )
        );

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
