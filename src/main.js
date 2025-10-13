import './styles/style.css'
import { renderTracker, setupTrackerClickHandler } from './components/tracker.js'
import { renderConverter, setupConverter } from './components/converter.js'
import { renderChart, setupChart, updateChart } from './components/chart.js'
import { renderCoinDetail, setupCoinDetail } from './components/coinDetail.js'

document.body.classList.add('dark'); // Default to dark mode

document.querySelector('#app').innerHTML = `
  <header>
    <div class="logo">
      <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="25" cy="25" r="20" fill="var(--primary-blue)" stroke="var(--primary-blue)" stroke-width="2"/>
        <text x="25" y="32" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="24" font-weight="bold">C</text>
      </svg>
      <h1>CryptoWise</h1>
    </div>
    <button id="theme-toggle">Toggle Theme</button>
  </header>
  <main>
    <section id="tracker"></section>
    <section id="converter"></section>
    <section id="chart"></section>
    <section id="coin-detail" style="display:none;"></section>
  </main>
`

// Theme toggle
document.getElementById('theme-toggle').addEventListener('click', () => {
  document.body.classList.toggle('dark');
  document.body.classList.toggle('light');
});

async function showCoinDetail(coinId) {
  const coinDetailSection = document.getElementById('coin-detail');
  coinDetailSection.innerHTML = '<div class="loading"><div class="spinner"></div></div>';
  coinDetailSection.style.display = 'block';

  // Hide other sections
  document.getElementById('tracker').style.display = 'none';
  document.getElementById('converter').style.display = 'none';
  document.getElementById('chart').style.display = 'none';

  coinDetailSection.innerHTML = await renderCoinDetail(coinId);
  setupCoinDetail(coinId);

  // Setup back button
  const backButton = document.getElementById('close-coin-detail');
  if (backButton) {
    backButton.addEventListener('click', () => {
      coinDetailSection.style.display = 'none';
      document.getElementById('tracker').style.display = 'block';
      document.getElementById('converter').style.display = 'block';
      document.getElementById('chart').style.display = 'block';
    });
  }
}

// Render components
async function initApp() {
  // Show loading states
  document.getElementById('tracker').innerHTML = '<div class="loading"><div class="spinner"></div></div>';
  document.getElementById('converter').innerHTML = '<div class="loading"><div class="spinner"></div></div>';
  document.getElementById('chart').innerHTML = '<div class="loading"><div class="spinner"></div></div>';

  // Render components
  document.getElementById('tracker').innerHTML = await renderTracker();
  document.getElementById('converter').innerHTML = await renderConverter();
  document.getElementById('chart').innerHTML = await renderChart();

  setupConverter();
  setupChart();
  await updateChart();

  setupTrackerClickHandler(showCoinDetail);

  // Real-time updates every minute
  setInterval(async () => {
    document.getElementById('tracker').innerHTML = await renderTracker();
    setupTrackerClickHandler(showCoinDetail);
    await updateChart();
  }, 60000);
}

initApp();
