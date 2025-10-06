import { useState, useEffect } from 'react';

const COINGECKO_API = 'https://api.coingecko.com/api/v3';

const Favorites = () => {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : ['bitcoin', 'ethereum'];
  });
  const [prices, setPrices] = useState({});
  const [newFavorite, setNewFavorite] = useState('');

  useEffect(() => {
    fetchPrices();
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const fetchPrices = async () => {
    if (favorites.length === 0) {
      setPrices({});
      return;
    }
    try {
      const response = await fetch(
        `${COINGECKO_API}/simple/price?ids=${favorites.join(',')}&vs_currencies=usd`
      );
      const data = await response.json();
      setPrices(data);
    } catch (error) {
      console.error('Error fetching favorite prices:', error);
    }
  };

  const addFavorite = () => {
    if (newFavorite && !favorites.includes(newFavorite)) {
      setFavorites([...favorites, newFavorite]);
      setNewFavorite('');
    }
  };

  const removeFavorite = (coin) => {
    setFavorites(favorites.filter(fav => fav !== coin));
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Inter, sans-serif', backgroundColor: 'var(--background-color)', color: 'var(--text-color)', minHeight: '100vh', maxWidth: '400px', margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'CodecPro Bold, sans-serif', fontSize: '2rem', marginBottom: '1rem' }}>Favorites</h1>
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Add coin id (e.g. bitcoin)"
          value={newFavorite}
          onChange={e => setNewFavorite(e.target.value)}
          style={{ width: '70%', padding: '0.5rem', marginRight: '0.5rem' }}
        />
        <button onClick={addFavorite} style={{ padding: '0.5rem 1rem', backgroundColor: '#2D9CDB', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Add</button>
      </div>
      <ul>
        {favorites.map(coin => (
          <li key={coin} style={{ marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>{coin} : ${prices[coin] ? prices[coin].usd.toLocaleString() : 'Loading...'}</span>
            <button onClick={() => removeFavorite(coin)} style={{ backgroundColor: '#EB5757', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', padding: '0.25rem 0.5rem' }}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
