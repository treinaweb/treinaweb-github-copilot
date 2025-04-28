'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Repository } from './types/repository';
import { fetchRandomRepository } from './utils/fetchRandomRepository';
import RepositoryCard from './components/RepositoryCard';
import RandomButton from './components/RandomButton';

// List of programming languages for the dropdown
const PROGRAMMING_LANGUAGES = [
  'JavaScript',
  'TypeScript',
  'Python',
  'Java',
  'Go',
  'Rust',
  'C',
  'C++',
  'C#',
  'Ruby',
  'PHP',
  'Swift',
  'Kotlin',
  'Dart',
  'Scala',
  'Elixir',
  'Haskell',
];

export default function Home() {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [repository, setRepository] = useState<Repository | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch a random repository based on the selected language
  const getRandomRepository = async () => {
    if (!selectedLanguage) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const repo = await fetchRandomRepository(selectedLanguage);
      setRepository(repo);
    } catch (err) {
      console.error('Error fetching repository:', err);
      setError('Error fetching repositories');
      setRepository(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch a repository when the language changes
  useEffect(() => {
    if (selectedLanguage) {
      getRandomRepository();
    }
  }, [selectedLanguage]);

  return (
    <main className="min-h-screen flex flex-col items-center p-6">
      <header className="w-full max-w-lg mb-6 pt-6">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-black dark:bg-white rounded-lg flex items-center justify-center mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white dark:text-black">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
          </div>
          <h1 className="text-2xl font-bold">GitHub Repository Finder</h1>
        </div>
        
        <div className="relative">
          <select
            value={selectedLanguage || ''}
            onChange={(e) => setSelectedLanguage(e.target.value || null)}
            className="block w-full px-4 py-3 pr-10 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
            aria-label="Select a programming language"
          >
            <option value="">Select a Language</option>
            {PROGRAMMING_LANGUAGES.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
        </div>
      </header>

      <div className="w-full max-w-lg mb-8">
        {/* Empty state */}
        {!selectedLanguage && !isLoading && !error && (
          <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg text-center">
            <p className="text-gray-600 dark:text-gray-300">Please select a language</p>
          </div>
        )}

        {/* Loading state */}
        {isLoading && (
          <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg text-center">
            <p className="text-gray-600 dark:text-gray-300">Loading, please wait..</p>
          </div>
        )}

        {/* Error state */}
        {error && !isLoading && (
          <div className="bg-red-100 dark:bg-red-900/20 p-8 rounded-lg text-center">
            <p className="text-red-600 dark:text-red-300 mb-4">{error}</p>
            <button 
              onClick={getRandomRepository}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Click to retry
            </button>
          </div>
        )}

        {/* Repository card */}
        {repository && !isLoading && !error && <RepositoryCard repository={repository} />}
      </div>

      {/* Refresh button - only show when a repository is loaded */}
      {selectedLanguage && repository && !isLoading && !error && (
        <div className="w-full max-w-lg">
          <RandomButton onClick={getRandomRepository} isLoading={isLoading} />
        </div>
      )}
    </main>
  );
}
