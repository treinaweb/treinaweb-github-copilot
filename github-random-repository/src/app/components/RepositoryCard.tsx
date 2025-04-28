'use client';

import { Repository } from '../types/repository';
import Link from 'next/link';

interface RepositoryCardProps {
  repository: Repository;
}

export default function RepositoryCard({ repository }: RepositoryCardProps) {
  return (
    <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          <Link 
            href={repository.html_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:underline"
          >
            {repository.name}
          </Link>
        </h3>
        <span className="text-sm text-gray-500 dark:text-gray-400">{repository.language || 'Unknown'} 🛠️</span>
      </div>
      
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        {repository.description || 'No description available.'}
      </p>
      
      <div className="flex flex-wrap gap-4 text-sm">
        <span className="flex items-center gap-1">
          <span>⭐</span> 
          <span>{repository.stargazers_count.toLocaleString()}</span>
        </span>
        <span className="flex items-center gap-1">
          <span>🍴</span> 
          <span>{repository.forks_count.toLocaleString()}</span>
        </span>
        <span className="flex items-center gap-1">
          <span>🐛</span> 
          <span>{repository.open_issues_count.toLocaleString()}</span>
        </span>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <Link 
          href={repository.owner.html_url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:underline text-sm text-gray-600 dark:text-gray-400"
        >
          <img 
            src={repository.owner.avatar_url} 
            alt={`${repository.owner.login}'s avatar`}
            className="w-5 h-5 rounded-full"
          />
          {repository.owner.login}
        </Link>
      </div>
    </div>
  );
}