const BASE_URL='https://api.themoviedb.org/3'
const API_KEY='eaf2fbcdf4ede3eb66f9c79f95add945'
const SESSION_ID = '11c1705e395abca59dfd04cc0732032d4f96f9a8'
const ACCOUNT_ID = '18089490'

export const getMovies = (pageNumber = 1) =>
`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${pageNumber}`;

export const getSearchMovies = (searchValue,pageNumber = 1) =>
`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${searchValue}&page=${pageNumber}`

export const getFavorites = (pageNumber = 1) =>

`${BASE_URL}/account/${ACCOUNT_ID}/favorite/movies?api_key=${API_KEY}&session_id=${SESSION_ID}&page=${pageNumber}`;

export const getWatches = (pageNumber = 1) =>
`${BASE_URL}/account/${ACCOUNT_ID}/watchlist/movies?api_key=${API_KEY}&session_id=${SESSION_ID}&page=${pageNumber}`;

export const saveFavorites = () =>
`${BASE_URL}/account/${ACCOUNT_ID}/favorite?api_key=${API_KEY}&session_id=${SESSION_ID}`;

export const saveWatches = () =>
`${BASE_URL}/account/${ACCOUNT_ID}/watchlist?api_key=${API_KEY}&session_id=${SESSION_ID}`;

export const getShowDetails = (movieId) =>
`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`