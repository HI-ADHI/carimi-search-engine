import Head from 'next/head';
import SearchBar from '../components/SearchBar';
import DarkModeToggle from '../components/DarkModeToggle';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Head>
        <title>Carimi — Search, Simplified. Powered by Ethical Intelligence.</title>
        <meta name="description" content="Carimi search engine - fast, simple, and ethical" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      
      <main className="container mx-auto px-4 py-12 flex flex-col items-center">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">Carimi</h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-light">
            Search, Simplified. Powered by Ethical Intelligence.
          </p>
        </div>
        
        <div className="w-full max-w-3xl">
          <SearchBar />
        </div>
        
        <div className="mt-8 w-full max-w-3xl">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Trending Topics</h2>
            <div className="flex flex-wrap gap-2">
              {['Artificial Intelligence', 'Climate Change', 'Blockchain', 'Space Exploration', 'Renewable Energy'].map((topic, index) => (
                <button 
                  key={index} 
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <footer className="mt-auto py-6 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
          <p>© {new Date().getFullYear()} Carimi. All rights reserved.</p>
        </div>
      </footer>
      
      <DarkModeToggle />
    </div>
  );
}