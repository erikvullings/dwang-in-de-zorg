/** During development, use this URL to access the server. */
const apiService = process.env.SERVER || window.location.origin; // `http://localhost:${process.env.LOKI_PORT}/`;

/** Application state */
export const AppState = {
  isSearching: false,
  searchQuery: '',
  apiService,
};
