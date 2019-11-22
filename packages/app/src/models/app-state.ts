/** During development, use this URL to access the server. */
const apiService = process.env.SERVER || window.location.origin;

/** Application state */
export const AppState = {
  isSearching: false,
  searchQuery: '',
  apiService,
  lastVisited: () => window.localStorage.getItem('last_visited'),
  lastVisitedName: () => (window.localStorage.getItem('last_visited_name') || '').replace(/undefined/i, ''),
};
