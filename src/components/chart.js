import Chart from 'chart.js/auto';
import { getCryptoHistory } from '../api/api.js';
import 'chartjs-adapter-date-fns';

export async function renderChart() {
  try {
    const history = await getCryptoHistory('bitcoin', 7);
    if (!history.prices || history.prices.length === 0) {
      throw new Error('No chart data available');
    }
    const prices = history.prices.map(p => ({ x: new Date(p[0]), y: p[1] }));

    const html = `
      <div class="chart-container">
        <h2>Bitcoin Price Chart (7 Days)</h2>
        <canvas id="price-chart"></canvas>
      </div>
    `;
    return html;
  } catch (error) {
    console.error('Error rendering chart:', error);
    return `
      <div class="chart-container">
        <h2>Bitcoin Price Chart (7 Days)</h2>
        <div class="error">Failed to load chart data. Please try again later.</div>
      </div>
    `;
  }
}

export function setupChart() {
  const canvas = document.getElementById('price-chart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
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
  try {
    const history = await getCryptoHistory('bitcoin', 7);
    if (!history.prices || history.prices.length === 0) return;
    const prices = history.prices.map(p => ({ x: new Date(p[0]), y: p[1] }));

    const chart = Chart.getChart('price-chart');
    if (chart) {
      chart.data.datasets[0].data = prices;
      chart.update();
    }
  } catch (error) {
    console.error('Error updating chart:', error);
  }
}
