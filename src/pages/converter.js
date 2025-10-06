import { useState, useEffect } from 'react';

const COINGECKO_API = 'https://api.coingecko.com/api/v3';

const Converter = () => {
  const [cryptoList, setCryptoList] = useState([]);
  const [fiatList, setFiatList] = useState(['usd', 'eur', 'gbp', 'jpy', 'aud']);
  const [selectedCrypto, setSelectedCrypto] = useState('bitcoin');
  const [selectedFiat, setSelectedFiat] = useState('usd');
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(null);

  useEffect(() => {
    fetchCryptoList();
  }, []);

  useEffect(() => {
    if (selectedCrypto && selectedFiat && amount) {
      convertCurrency();
    }
  }, [selectedCrypto, selectedFiat, amount]);

  const fetchCryptoList = async () => {
    try {
      const response = await fetch(`${COINGECKO_API}/coins/list`);
      const data = await response.json();
      setCryptoList(data);
    } catch (error) {
      console.error('Error fetching crypto list:', error);
    }
  };

  const convertCurrency = async () => {
    try {
      const response = await fetch(
        `${COINGECKO_API}/simple/price?ids=${selectedCrypto}&vs_currencies=${selectedFiat}`
      );
      const data = await response.json();
      const rate = data[selectedCrypto][selectedFiat];
      setConvertedAmount(rate * amount);
    } catch (error) {
      console.error('Error converting currency:', error);
    }
  };

  return `
    <div style="padding: 2rem; font-family: 'Inter', sans-serif; background-color: var(--background-color); color: var(--text-color); min-height: 100vh; max-width: 400px; margin: 0 auto;">
      <h1 style="font-family: 'CodecPro Bold', sans-serif; font-size: 2rem; margin-bottom: 1rem;">Converter</h1>
      <label for="crypto-select">Crypto</label>
      <select id="crypto-select" onchange="this.dispatchEvent(new CustomEvent('cryptoChange', { detail: this.value }))" style="width: 100%; padding: 0.5rem; margin-bottom: 1rem;">
        ${cryptoList.map(c => `<option value="${c.id}" ${c.id === selectedCrypto ? 'selected' : ''}>${c.name}</option>`).join('')}
      </select>

      <label for="fiat-select">Fiat</label>
      <select id="fiat-select" onchange="this.dispatchEvent(new CustomEvent('fiatChange', { detail: this.value }))" style="width: 100%; padding: 0.5rem; margin-bottom: 1rem;">
        ${fiatList.map(f => `<option value="${f}" ${f === selectedFiat ? 'selected' : ''}>${f.toUpperCase()}</option>`).join('')}
      </select>

      <label for="amount-input">Amount</label>
      <input id="amount-input" type="number" min="0" value="${amount}" oninput="this.dispatchEvent(new CustomEvent('amountChange', { detail: this.value }))" style="width: 100%; padding: 0.5rem; margin-bottom: 1rem;" />

      <button onclick="this.dispatchEvent(new CustomEvent('convertClick'))" style="width: 100%; padding: 0.75rem; background-color: #2D9CDB; color: white; border: none; border-radius: 4px; font-weight: 600; cursor: pointer;">Convert</button>

      <div style="margin-top: 1rem; font-size: 1.25rem;">
        ${convertedAmount !== null ? `${amount} ${selectedCrypto.toUpperCase()} = ${convertedAmount.toFixed(4)} ${selectedFiat.toUpperCase()}` : ''}
      </div>
    </div>
  `;
};

export default Converter;
