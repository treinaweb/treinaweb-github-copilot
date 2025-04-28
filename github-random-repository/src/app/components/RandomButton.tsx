'use client';

interface RandomButtonProps {
  onClick: () => void;
  isLoading?: boolean;
}

export default function RandomButton({ onClick, isLoading = false }: RandomButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className="w-full px-4 py-3 font-medium text-white bg-black dark:bg-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? 'Loading...' : 'Refresh'}
    </button>
  );
}