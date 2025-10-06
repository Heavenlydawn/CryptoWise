import React, { useState, useEffect } from 'react';
import CoinLogo from './CoinLogo';

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.style.setProperty('--background-color', '#121212');
      document.documentElement.style.setProperty('--text-color', '#F7F7F7');
    } else {
      document.documentElement.style.setProperty('--background-color', '#F7F7F7');
      document.documentElement.style.setProperty('--text-color', '#121212');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <header style={styles.header}>
      <div style={styles.logo}>
        <CoinLogo />
        CryptoWise
      </div>
      <nav style={styles.nav}>
        <a href="/" style={styles.navLink}>Home</a>
        <a href="/dashboard" style={styles.navLink}>Dashboard</a>
        <a href="/favorites" style={styles.navLink}>Favorites</a>
      </nav>
      <div style={styles.toggleContainer}>
        <label style={styles.switch}>
          <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
          <span style={styles.slider}></span>
        </label>
      </div>
    </header>
  );
};

const styles = {
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1rem 2rem',
    backgroundColor: 'var(--background-color)',
    color: 'var(--text-color)',
    fontFamily: "'Inter', sans-serif",
    fontWeight: 'bold',
    fontSize: '1.2rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    fontFamily: "'CodecPro Bold', sans-serif",
    fontSize: '1.5rem',
    gap: '0.5rem',
  },
  nav: {
    display: 'flex',
    gap: '1.5rem',
  },
  navLink: {
    color: 'var(--text-color)',
    textDecoration: 'none',
    fontWeight: '600',
  },
  toggleContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  switch: {
    position: 'relative',
    display: 'inline-block',
    width: '40px',
    height: '20px',
  },
  slider: {
    position: 'absolute',
    cursor: 'pointer',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#ccc',
    borderRadius: '20px',
    transition: '.4s',
  },
  sliderBefore: {
    position: 'absolute',
    content: '""',
    height: '16px',
    width: '16px',
    left: '2px',
    bottom: '2px',
    backgroundColor: 'white',
    borderRadius: '50%',
    transition: '.4s',
  },
};

export default Header;
