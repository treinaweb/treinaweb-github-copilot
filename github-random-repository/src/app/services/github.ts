import { GitHubSearchResponse, Repository } from '../types/repository';

/**
 * Maximum number of repositories to fetch per request
 * GitHub API returns max 100 items per page
 */
const PER_PAGE = 100;

/**
 * Fetch repositories from GitHub API by language
 * @param language Programming language to search for
 * @returns Promise with GitHub search response
 */
export async function fetchRepositoriesByLanguage(language: string): Promise<GitHubSearchResponse> {
  const url = new URL('https://api.github.com/search/repositories');
  
  url.searchParams.append('q', `language:${language}`);
  url.searchParams.append('sort', 'stars');
  url.searchParams.append('order', 'desc');
  url.searchParams.append('per_page', PER_PAGE.toString());
  
  // Add a random page number to diversify results
  // GitHub limits to 1000 results (10 pages of 100 items)
  const randomPage = Math.floor(Math.random() * 10) + 1;
  url.searchParams.append('page', randomPage.toString());
  
  const response = await fetch(url.toString(), { 
    headers: {
      'Accept': 'application/vnd.github.v3+json',
    },
    // Use Next.js cache behavior
    next: { revalidate: 60 }
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`GitHub API error: ${response.status} - ${error}`);
  }
  
  return response.json();
}