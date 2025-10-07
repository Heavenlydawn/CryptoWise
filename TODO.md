ts# CryptoWise Development Plan

## Step 1: Install Dependencies ✅
- Add axios, chart.js to package.json
- Install via npm

## Step 2: Update HTML ✅
- Add Google Fonts links for JetBrains Mono (as CodecPro alternative) and Inter
- Add Lucide icons script

## Step 3: Update CSS ✅
- Implement color scheme: #2D9CDB, #27AE60, #EB5757, #121212, #F7F7F7
- Set typography: JetBrains Mono for headings, Inter for body
- Add styles for dark/light mode

## Step 4: Create API Module ✅
- src/api/api.js: Functions to fetch crypto prices from CoinGecko API with API key

## Step 5: Create Components ✅
- src/components/tracker.js: Display list of cryptos with prices
- src/components/converter.js: Crypto to fiat converter
- src/components/chart.js: Simple price chart using Chart.js

## Step 6: Update Main App ✅
- src/main.js: Render header with logo, main content with tracker and converter
- Add dark/light mode toggle

## Step 7: Implement Real-Time Updates ✅
- Use setInterval to refresh data every minute

## Step 8: Test and Polish
- Run dev server
- Ensure responsive design
- Add loading states, error handling
