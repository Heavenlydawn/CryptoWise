import { getTopCryptos } from '../api/api.js';

export async function renderTracker() {
  const cryptos = await getTopCryptos(10);
  const html = `
    <div class="tracker">
      <h2>Top Cryptocurrencies</h2>
      <div class="crypto-list">
        ${cryptos.map(crypto => `
          <div class="crypto-item">
            <img src="${crypto.image}" alt="${crypto.name}" class="crypto-icon">
            <div class="crypto-info">
              <h3>${crypto.name} (${crypto.symbol.toUpperCase()})</h3>
              <p>Price: $${crypto.current_price.toFixed(2)}</p>
              <p class="change ${crypto.price_change_percentage_24h >= 0 ? 'gain' : 'loss'}">
                24h Change: ${crypto.price_change_percentage_24h.toFixed(2)}%
              </p>
              <p>Market Cap: $${crypto.market_cap.toLocaleString()}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
  return html;
}
