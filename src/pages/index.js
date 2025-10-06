import { useState, useEffect } from 'react';

const COINGECKO_API = 'https://api.coingecko.com/api/v3';

const Dashboard = () => {
  const [prices, setPrices] = useState({});
  const [gainers, setGainers] = useState([]);
  const [losers, setLosers] = useState([]);
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    fetchPrices();
    fetchMarketTrends();
  }, []);

  const fetchPrices = async () => {
    try {
      const response = await fetch(
        `${COINGECKO_API}/simple/price?ids=bitcoin,ethereum,dogecoin&vs_currencies=usd`
      );
      const data = await response.json();
      setPrices(data);
    } catch (error) {
      console.error('Error fetching prices:', error);
    }
  };

  const fetchMarketTrends = async () => {
    try {
      // Fetch trending coins from CoinGecko
      const trendingResponse = await fetch(`${COINGECKO_API}/search/trending`);
      const trendingData = await trendingResponse.json();
      setTrending(trendingData.coins.map(c => c.item));

      // For gainers and losers, fetch top 100 coins and sort by price change percentage
      const marketResponse = await fetch(
        `${COINGECKO_API}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&price_change_percentage=24h`
      );
      const marketData = await marketResponse.json();

      const sortedByChange = [...marketData].sort(
        (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
      );

      setGainers(sortedByChange.slice(0, 5));
      setLosers(sortedByChange.slice(-5).reverse());
    } catch (error) {
      console.error('Error fetching market trends:', error);
    }
  };

  return `
    <div style="padding: 2rem; font-family: 'Inter', sans-serif; background-color: var(--background-color); color: var(--text-color); min-height: 100vh;">
      <h1 style="font-family: 'CodecPro Bold', sans-serif; font-size: 2rem; margin-bottom: 1rem;">Track cryptocurrencies in real-time</h1>
      <div style="display: flex; gap: 1rem; margin-bottom: 2rem;">
        <div style="background: var(--background-color); padding: 1rem; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); flex: 1;">
          <h2>Bitcoin</h2>
          <p style="font-size: 1.5rem;">${prices.bitcoin ? '$' + prices.bitcoin.usd.toLocaleString() : 'Loading...'}</p>
        </div>
        <div style="background: var(--background-color); padding: 1rem; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); flex: 1;">
          <h2>Ethereum</h2>
          <p style="font-size: 1.5rem;">${prices.ethereum ? '$' + prices.ethereum.usd.toLocaleString() : 'Loading...'}</p>
        </div>
        <div style="background: var(--background-color); padding: 1rem; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); flex: 1;">
          <h2>Dogecoin</h2>
          <p style="font-size: 1.5rem;">${prices.dogecoin ? '$' + prices.dogecoin.usd.toLocaleString() : 'Loading...'}</p>
        </div>
      </div>

      <h2>Market Trends</h2>
      <div style="display: flex; gap: 2rem;">
        <div style="flex: 1;">
          <h3>Gainers</h3>
          <ul>
            ${gainers.map(coin => `<li>${coin.name} (${coin.symbol.toUpperCase()}): +${coin.price_change_percentage_24h.toFixed(2)}%</li>`).join('')}
          </ul>
        </div>
        <div style="flex: 1;">
          <h3>Losers</h3>
          <ul>
            ${losers.map(coin => `<li>${coin.name} (${coin.symbol.toUpperCase()}): ${coin.price_change_percentage_24h.toFixed(2)}%</li>`).join('')}
          </ul>
        </div>
        <div style="flex: 1;">
          <h3>Trending</h3>
          <ul>
            ${trending.map(coin => `<li>${coin.name} (${coin.symbol.toUpperCase()})</li>`).join('')}
          </ul>
        </div>
      </div>
    </div>
  `;
};

export default Dashboard;
