import './styles/style.css'
import { renderTracker } from './components/tracker.js'
import { renderConverter, setupConverter } from './components/converter.js'
import { renderChart, setupChart, updateChart } from './components/chart.js'

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
  </main>
`

// Theme toggle
document.getElementById('theme-toggle').addEventListener('click', () => {
  document.body.classList.toggle('dark');
  document.body.classList.toggle('light');
});

// Render components
async function initApp() {
  document.getElementById('tracker').innerHTML = await renderTracker();
  document.getElementById('converter').innerHTML = await renderConverter();
  document.getElementById('chart').innerHTML = await renderChart();

  setupConverter();
  setupChart();
  await updateChart();

  // Real-time updates every minute
  setInterval(async () => {
    document.getElementById('tracker').innerHTML = await renderTracker();
    await updateChart();
  }, 60000);
}

initApp();
