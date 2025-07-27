import axios from 'axios';

const API_KEY = process.env.BING_API_KEY;

export const searchBing = async (query, filters = {}) => {
  try {
    const params = {
      q: query,
      count: 10,
      mkt: 'en-US',
      ...filters
    };

    const response = await axios.get('https://api.bing.microsoft.com/v7.0/search', {
      headers: { 'Ocp-Apim-Subscription-Key': API_KEY },
      params
    });

    return response.data.webPages.value.map(item => ({
      title: item.name,
      url: item.url,
      snippet: item.snippet,
      source: item.displayUrl,
      type: 'web',
      date: item.dateLastCrawled || null
    }));
  } catch (error) {
    console.error('Bing Search Error:', error);
    return [];
  }
};