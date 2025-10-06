import { useState, useEffect } from 'react';
import '../styles/coinDetail.css';

const COINGECKO_API = 'https://api.coingecko.com/api/v3';

const CoinDetail = ({ coinId, onBack }) => {
  const [coinData, setCoinData] = useState(null);
  const [timeRange, setTimeRange] = useState('7d');
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (coinId) {
      fetchCoinData();
      fetchChartData();
    }
  }, [coinId, timeRange]);

  const fetchCoinData = async () => {
    try {
      const response = await fetch(`${COINGECKO_API}/coins/${coinId}`);
      const data = await response.json();
      setCoinData(data);
    } catch (error) {
      console.error('Error fetching coin data:', error);
    }
  };

  const fetchChartData = async () => {
    try {
      let days = 7;
      if (timeRange === '24h') days = 1;
      else if (timeRange === '30d') days = 30;

      const response = await fetch(
        `${COINGECKO_API}/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`
      );
      const data = await response.json();
      setChartData(data.prices || []);
    } catch (error) {
      console.error('Error fetching chart data:', error);
    }
  };

  const renderChart = () => {
    if (!chartData.length) return <p>Loading chart...</p>;

    // Simple line chart using SVG
    const maxPrice = Math.max(...chartData.map(p => p[1]));
    const minPrice = Math.min(...chartData.map(p => p[1]));
    const width = 300;
    const height = 100;
    const points = chartData
      .map(([time, price], i) => {
        const x = (i / (chartData.length - 1)) * width;
        const y = height - ((price - minPrice) / (maxPrice - minPrice)) * height;
        return `${x},${y}`;
      })
      .join(' ');

    return (
      <svg width={width} height={height} className="coin-chart">
        <polyline
          fill="none"
          stroke="#2D9CDB"
          strokeWidth="2"
          points={points}
        />
      </svg>
    );
  };

  if (!coinData) return <p>Loading coin details...</p>;

  return (
    <div className="coin-detail-container">
      <h2>{coinData.name}</h2>
      <p className="price">${coinData.market_data.current_price.usd.toLocaleString()}</p>
      <p>Availability: {coinData.market_data.circulating_supply.toLocaleString()}</p>
      <p>Market Cap: {coinData.market_data.market_cap.usd.toLocaleString()}</p>

      <div className="chart-container">
        {renderChart()}
      </div>

      <div className="time-range-buttons">
        {['24h', '7d', '30d'].map(range => (
          <button
            key={range}
            className={range === timeRange ? 'active' : ''}
            onClick={() => setTimeRange(range)}
          >
            {range.toUpperCase()}
          </button>
        ))}
      </div>

      <button className="back-button" onClick={onBack}>Back to Home</button>
    </div>
  );
};

export default CoinDetail;
