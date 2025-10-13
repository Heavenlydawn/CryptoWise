import { getTopCryptos } from '../api/api.js';

export async function renderTracker() {
  try {
    const cryptos = await getTopCryptos(10);
    if (cryptos.length === 0) {
      throw new Error('No data available');
    }
    const html = `
      <div class="tracker">
        <h2>Top Cryptocurrencies</h2>
        <div class="crypto-list">
          ${cryptos.map(crypto => `
            <div class="crypto-item" data-coin-id="${crypto.id}">
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
  } catch (error) {
    console.error('Error rendering tracker:', error);
    return `
      <div class="tracker">
        <h2>Top Cryptocurrencies</h2>
        <div class="error">Failed to load cryptocurrency data. Please try again later.</div>
      </div>
    `;
  }
}

export function setupTrackerClickHandler(onCoinClick) {
  const cryptoList = document.querySelector('.crypto-list');
  if (!cryptoList) return;
  cryptoList.addEventListener('click', (event) => {
    const cryptoItem = event.target.closest('.crypto-item');
    if (cryptoItem) {
      const coinId = cryptoItem.getAttribute('data-coin-id');
      if (coinId) {
        onCoinClick(coinId);
      }
    }
  });
}
