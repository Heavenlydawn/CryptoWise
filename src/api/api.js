import axios from 'axios';

const BASE_URL = 'https://api.coingecko.com/api/v3';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'x-cg-demo-api-key': 'CG-YTYg8YnA5itJkJvRMZCVGFS9'
  }
});

export async function getCryptoPrices(ids, currencies = ['usd']) {
  try {
    const response = await apiClient.get('/simple/price', {
      params: {
        ids: ids.join(','),
        vs_currencies: currencies.join(',')
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching crypto prices:', error);
    return {};
  }
}

export async function getTopCryptos(limit = 10) {
  try {
    const response = await apiClient.get('/coins/markets', {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: limit,
        page: 1,
        sparkline: false
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching top cryptos:', error);
    return [];
  }
}

export async function getCryptoHistory(id, days = 7) {
  try {
    const response = await apiClient.get(`/coins/${id}/market_chart`, {
      params: {
        vs_currency: 'usd',
        days: days
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching crypto history:', error);
    return { prices: [] };
  }
}

export async function getExchangeRates() {
  try {
    const response = await apiClient.get('/exchange_rates');
    return response.data.rates;
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    return {};
  }
}

export async function getCoinDetails(id) {
  try {
    const response = await apiClient.get(`/coins/${id}`, {
      params: {
        localization: false,
        tickers: false,
        market_data: true,
        community_data: false,
        developer_data: false,
        sparkline: false
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching coin details:', error);
    return null;
  }
}
