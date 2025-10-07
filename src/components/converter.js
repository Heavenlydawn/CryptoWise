import { getCryptoPrices, getExchangeRates } from '../api/api.js';

export async function renderConverter() {
  const rates = await getExchangeRates();
  const cryptoPrices = await getCryptoPrices(['bitcoin', 'ethereum'], ['usd']);

  const html = `
    <div class="converter">
      <h2>Crypto to Fiat Converter</h2>
      <form id="converter-form">
        <div class="input-group">
          <label for="crypto-amount">Crypto Amount</label>
          <input type="number" id="crypto-amount" placeholder="1" step="0.01">
          <select id="crypto-select">
            <option value="bitcoin">Bitcoin (BTC)</option>
            <option value="ethereum">Ethereum (ETH)</option>
          </select>
        </div>
        <div class="input-group">
          <label for="fiat-amount">Fiat Amount</label>
          <input type="number" id="fiat-amount" readonly>
          <select id="fiat-select">
            <option value="usd">USD</option>
            <option value="eur">EUR</option>
            <option value="gbp">GBP</option>
          </select>
        </div>
        <button type="submit">Convert</button>
      </form>
    </div>
  `;
  return html;
}

export function setupConverter() {
  const form = document.getElementById('converter-form');
  const cryptoAmount = document.getElementById('crypto-amount');
  const fiatAmount = document.getElementById('fiat-amount');
  const cryptoSelect = document.getElementById('crypto-select');
  const fiatSelect = document.getElementById('fiat-select');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const amount = parseFloat(cryptoAmount.value);
    const crypto = cryptoSelect.value;
    const fiat = fiatSelect.value;

    const prices = await getCryptoPrices([crypto], [fiat]);
    const rate = prices[crypto][fiat];
    fiatAmount.value = (amount * rate).toFixed(2);
  });
}
