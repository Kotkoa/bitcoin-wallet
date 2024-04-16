export const fetchTransactions = async (address: string) => {
  const urlUtxo = `https://blockstream.info/testnet/api/address/${address}/utxo`;
  const urlTxs = `https://blockstream.info/testnet/api/address/${address}/txs`;

  try {
    const response = await fetch(urlUtxo);
    const responseTxs = await fetch(urlTxs);

    const data = await response.json();
    const dataTxs = await responseTxs.json();

    console.log('first data:', data);
    console.log('third data:', dataTxs);
    return data;
  } catch (error) {
    console.error('Failed to fetch transactions:', error);
    return [];
  }
};

export const fetchBalance = async (address: string) => {
  const urlAdderss = `https://blockstream.info/testnet/api/address/${address}`;

  try {
    const response = await fetch(urlAdderss);
    const data = await response.json();

    console.log('second data:', data.chain_stats.funded_txo_sum);

    return data.chain_stats.funded_txo_sum / 100000000;
  } catch (error) {
    console.error('Failed to fetch balance:', error);
    return 0;
  }
};
