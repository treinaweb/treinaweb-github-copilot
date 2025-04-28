import { Repository } from '../types/repository';
import { fetchRepositoriesByLanguage } from '../services/github';

/**
 * Fetch a random repository for the given programming language
 * @param language Programming language to search for
 * @returns A random repository or null if none found
 */
export async function fetchRandomRepository(language: string): Promise<Repository | null> {
  try {
    const searchResponse = await fetchRepositoriesByLanguage(language);
    
    if (searchResponse.items.length === 0) {
      return null;
    }
    
    // Get a random repository from the results
    const randomIndex = Math.floor(Math.random() * searchResponse.items.length);
    return searchResponse.items[randomIndex];
  } catch (error) {
    console.error('Error fetching random repository:', error);
    throw error;
  }
}