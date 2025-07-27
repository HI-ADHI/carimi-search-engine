import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import ResultsList from '../components/ResultsList';
import Filters from '../components/Filters';
import { debounce } from 'lodash';

export default function SearchPage() {
  const router = useRouter();
  const { q } = router.query;
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    source: 'all',
    type: 'all',
    sortBy: 'relevance'
  });

  const fetchResults = async (searchQuery, currentFilters) => {
    if (!searchQuery) return;
    
    setLoading(true);
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}&source=${currentFilters.source}&type=${currentFilters.type}&sortBy=${currentFilters.sortBy}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error fetching results:', error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchResults = debounce(fetchResults, 300);

  useEffect(() => {
    if (q) {
      debouncedFetchResults(q, filters);
    }
  }, [q, filters]);

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Head>
        <title>Search Results - Carimi</title>
        <meta name="description" content={`Search results for "${q}" - Carimi search engine`} />
        <meta property="og:title" content={`Search Results for "${q}" - Carimi`} />
        <meta property="og:description" content="Carimi search engine - fast, simple, and ethical" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Results for "{q}"
          </h1>
          <Filters 
            filters={filters} 
            onFilterChange={handleFilterChange} 
          />
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : results.length > 0 ? (
          <ResultsList results={results} />
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No results found for "{q}". Try a different search term.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}