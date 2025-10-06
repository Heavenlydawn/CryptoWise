
import { renderHeader } from './components/header.js';
import { renderHome } from './pages/index.js';

const app = document.getElementById('app');

function mount() {
  app.innerHTML = `
    <div class="container">
      <div id="header"></div>
      <main id="main"></main>
    </div>
  `;

  renderHeader(document.getElementById('header'));
  renderHome(document.getElementById('main'));
}

mount();
