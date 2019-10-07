const getRootUrl = () => {
  // Regex matching everything until the first hash symbol, so should also be able to deal with route rewriting...
  const regex = /https?:\/\/.*(?=\/#)/i;
  const route = document.location.href;
  const m = route.match(regex);
  return (m && m.length === 1) ? m[0].toString() : '';
};

/** During development, use this URL to access the server. */
const apiDevService = process.env.SERVER;
// const apiDevService = 'http://localhost:3333';

/** Application state */
export const AppState = {
  searchQuery: '',
  usingDevServer: false,
  apiService: () => AppState.usingDevServer ? apiDevService : getRootUrl(),
};
