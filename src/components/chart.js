import Chart from 'chart.js/auto';
import { getCryptoHistory } from '../api/api.js';

export async function renderChart() {
  const history = await getCryptoHistory('bitcoin', 7);
  const prices = history.prices.map(p => ({ x: new Date(p[0]), y: p[1] }));

  const html = `
    <div class="chart-container">
      <h2>Bitcoin Price Chart (7 Days)</h2>
      <canvas id="price-chart"></canvas>
    </div>
  `;
  return html;
}

export function setupChart() {
  const ctx = document.getElementById('price-chart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      datasets: [{
        label: 'Bitcoin Price (USD)',
        data: [], // Will be updated
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
}

export async function updateChart() {
  const history = await getCryptoHistory('bitcoin', 7);
  const prices = history.prices.map(p => ({ x: new Date(p[0]), y: p[1] }));

  const chart = Chart.getChart('price-chart');
  if (chart) {
    chart.data.datasets[0].data = prices;
    chart.update();
  }
}
