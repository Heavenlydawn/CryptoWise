import Chart from 'chart.js/auto';
import { getCoinDetails, getCryptoHistory } from '../api/api.js';

let chartInstance = null;

export async function renderCoinDetail(coinId) {
  try {
    const coin = await getCoinDetails(coinId);
    if (!coin) {
      throw new Error('No coin data available');
    }

    const html = `
      <div class="coin-detail">
        <button id="close-coin-detail" class="close-button">Back</button>
        <div class="coin-header">
          <img src="${coin.image.small}" alt="${coin.name}" class="coin-icon">
          <h2>${coin.name} (${coin.symbol.toUpperCase()})</h2>
        </div>
        <div class="coin-stats">
          <p>Current Price: $${coin.market_data.current_price.usd.toLocaleString()}</p>
          <p>Market Cap: $${coin.market_data.market_cap.usd.toLocaleString()}</p>
          <p>24h Change: <span class="${coin.market_data.price_change_percentage_24h >= 0 ? 'gain' : 'loss'}">${coin.market_data.price_change_percentage_24h.toFixed(2)}%</span></p>
          <p>Circulating Supply: ${coin.market_data.circulating_supply.toLocaleString()}</p>
          <p>Total Supply: ${coin.market_data.total_supply ? coin.market_data.total_supply.toLocaleString() : 'N/A'}</p>
          <p>Rank: ${coin.market_cap_rank}</p>
        </div>
        <div class="coin-description">
          <h3>Description</h3>
          <p>${coin.description.en ? coin.description.en.split('. ')[0] + '.' : 'No description available.'}</p>
        </div>
        <div class="coin-chart-container">
          <h3>Price Chart (7 Days)</h3>
          <canvas id="coin-price-chart"></canvas>
        </div>
      </div>
    `;
    return html;
  } catch (error) {
    console.error('Error rendering coin detail:', error);
    return `
      <div class="coin-detail">
        <div class="error">Failed to load coin details. Please try again later.</div>
      </div>
    `;
  }
}

export function setupCoinDetail(coinId) {
  const canvas = document.getElementById('coin-price-chart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      datasets: [{
        label: 'Price (USD)',
        data: [],
        borderColor: 'var(--primary-blue)',
        backgroundColor: 'rgba(45, 156, 219, 0.1)',
        fill: true,
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          type: 'time',
          time: {
            unit: 'day'
          }
        },
        y: {
          beginAtZero: false
        }
      }
    }
  });

  updateCoinChart(coinId);
}

export async function updateCoinChart(coinId) {
  try {
    const history = await getCryptoHistory(coinId, 7);
    if (!history.prices || history.prices.length === 0) return;
    const prices = history.prices.map(p => ({ x: new Date(p[0]), y: p[1] }));

    if (chartInstance) {
      chartInstance.data.datasets[0].data = prices;
      chartInstance.update();
    }
  } catch (error) {
    console.error('Error updating coin chart:', error);
  }
}
