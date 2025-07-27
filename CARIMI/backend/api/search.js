import express from 'express';
import { searchGoogle } from '../services/googleSearch';
import { searchBing } from '../services/bingSearch';
import { cache } from '../services/cache';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { q, source, type, sortBy } = req.query;
    
    if (!q) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }

    // Check cache first
    const cacheKey = `search:${q}:${source || 'all'}:${type || 'all'}:${sortBy || 'relevance'}`;
    const cachedResults = await cache.get(cacheKey);
    
    if (cachedResults) {
      return res.json(cachedResults);
    }

    // Get results from both sources
    let results = [];
    
    if (!source || source === 'google') {
      const googleResults = await searchGoogle(q, {
        dateRestrict: sortBy === 'recent' ? 'd1' : undefined,
        hq: type === 'news' ? 'news' : undefined
      });
      results = [...results, ...googleResults];
    }

    if (!source || source === 'bing') {
      const bingResults = await searchBing(q, {
        freshness: sortBy === 'recent' ? 'Day' : undefined,
        responseFilter: 'Webpages'
      });
      results = [...results, ...bingResults];
    }

    // Filter by type if specified
    if (type && type !== 'all') {
      results = results.filter(result => {
        if (type === 'news') {
          return result.url.includes('news') || 
                 result.snippet.toLowerCase().includes('news');
        }
        return true;
      });
    }

    // Sort results
    if (sortBy === 'recent') {
      results.sort((a, b) => {
        if (!a.date && !b.date) return 0;
        if (!a.date) return 1;
        if (!b.date) return -1;
        return new Date(b.date) - new Date(a.date);
      });
    }

    // Cache results for 5 minutes
    await cache.set(cacheKey, results, 300);

    res.json(results);
  } catch (error) {
    console.error('Search Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;