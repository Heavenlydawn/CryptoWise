const COINGECKO_API = 'https://api.coingecko.com/api/v3';

export const fetchPrices = async (coinIds = ['bitcoin', 'ethereum', 'dogecoin'], vsCurrency = 'usd') => {
  try {
    const response = await fetch(
      `${COINGECKO_API}/simple/price?ids=${coinIds.join(',')}&vs_currencies=${vsCurrency}`
    );
    return await response.json();
  } catch (error) {
    console.error('Error fetching prices:', error);
    return null;
  }
};

export const fetchMarketTrends = async () => {
  try {
    const trendingResponse = await fetch(\`\${COINGECKO_API}/search/trending\`);
    const trendingData = await trendingResponse.json();

    const marketResponse = await fetch(
      \`\${COINGECKO_API}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&price_change_percentage=24h\`
    );
    const marketData = await marketResponse.json();

    const sortedByChange = [...marketData].sort(
      (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
    );

    return {
      gainers: sortedByChange.slice(0, 5),
      losers: sortedByChange.slice(-5).reverse(),
      trending: trendingData.coins.map(c => c.item),
    };
  } catch (error) {
    console.error('Error fetching market trends:', error);
    return null;
  }
};

export const fetchCoinDetail = async (coinId) => {
  try {
    const response = await fetch(\`\${COINGECKO_API}/coins/\${coinId}\`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching coin detail:', error);
    return null;
  }
};

export const fetchConversionRate = async (coinId, vsCurrency) => {
  try {
    const response = await fetch(
      \`\${COINGECKO_API}/simple/price?ids=\${coinId}&vs_currencies=\${vsCurrency}\`
    );
    const data = await response.json();
    return data[coinId] ? data[coinId][vsCurrency] : null;
  } catch (error) {
    console.error('Error fetching conversion rate:', error);
    return null;
  }
};

export const fetchCryptoList = async () => {
  try {
    const response = await fetch(\`\${COINGECKO_API}/coins/list\`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching crypto list:', error);
    return [];
  }
};
