import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { BsHeart, BsSuitHeartFill, BsFillBookmarkFill, BsBookmark } from "react-icons/bs";

import { getMovies, getSearchMovies, getFavorites, getWatches, saveFavorites, saveWatches } from "./request";

export const PictureContext = createContext({});
export const PictureContextProvider = ({ children }) => {
    const params = useLocation();
    const currentPath = params.pathname;
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState();
    const [favoriteTotalPages, setFavoriteTotalPages] = useState();
    const [watchTotalPages, setWatchTotalPages] = useState();
    const [searchTotalPages, setSearchTotalPages] = useState();
    const [searchValue, getSearchValue] = useState("");
    const [favoritecurrentPage, setFavoriteCurrentPage] = useState(1);
    const [WatchCurrentPage, setWatchCurrentPage] = useState(1);
    const [searchCurrentPage, setSearchCurrentPage] = useState(1);
    const headers = {
        'Content-Type': 'application/json;charset=utf-8'
    }
    const getMovieList = async () => {
        const url = getMovies(currentPage);
        const { data: getmovies } = await axios.get(url)
        if (getmovies.results) {
            const filterfFavoriteList = await filterFavoriteMovies(getmovies.results)
            const FilterMovieList = await filterWatchMovies(filterfFavoriteList)
            setMovies(FilterMovieList)
            setTotalPages(Math.ceil(getmovies.total_pages));
        }
    }
    useEffect(() => {
        refesh()
    }, [searchCurrentPage, favoritecurrentPage, WatchCurrentPage, currentPage]);
    const refesh = async () => {
        if (searchTotalPages !== undefined) {
            setSearchCurrentPage(searchCurrentPage)
            getSearchMoviesList(searchValue);
        }
        else if (currentPath === '/favorites') {
            setFavoriteCurrentPage(favoritecurrentPage)
            getFavoriteMovies();
        } else if (currentPath === '/watch_later') {
            setWatchCurrentPage(WatchCurrentPage)
            getWatchMovies();
        } else {
            setCurrentPage(currentPage)
            getMovieList();
        }
    }
    const getSearchMoviesList = async (searchValue) => {
        getSearchValue(searchValue)
        const url = getSearchMovies(searchValue, searchCurrentPage);
        const { data: getmovies } = await axios.get(url)
        if (getmovies.results) {
            const filterfFavoriteList = await filterFavoriteMovies(getmovies.results)
            const FilterMovieList = await filterWatchMovies(filterfFavoriteList)
            setMovies(FilterMovieList)
            setSearchTotalPages(Math.ceil(getmovies.total_pages));
        }
    };

    const getFavoriteMovies = async (filterfav) => {
        const url = getFavorites(favoritecurrentPage)
        const { data: getmovies } = await axios.get(url)
        if (getmovies.results) {
            const favoriteList = getmovies.results;
            const favoriteListData = favoriteList.map(v => ({ ...v, favorite: true, icon: <BsSuitHeartFill /> }))
            if (filterfav === 'filterfav') {
                return favoriteListData
            } else {
                const FilterMovieList = await filterWatchMovies(favoriteListData)
                console.log('qqqqqqqqqqqqqqqqqqqqqqq', FilterMovieList)
                setMovies(FilterMovieList)
                setFavoriteTotalPages(Math.ceil(getmovies.total_pages));

            }
        }
    }

    const getWatchMovies = async (filterwatchlist) => {
        const url = getWatches(WatchCurrentPage)
        const { data: getmovies } = await axios.get(url)
        if (getmovies.results) {
            const watchList = getmovies.results;
            const watchListData = watchList.map(v => ({ ...v, watchlist: true, watchicon: <BsFillBookmarkFill /> }))
            if (filterwatchlist === 'filterwatchlist') {
                return watchListData
            } else {
                const filterfFavoriteList = await filterFavoriteMovies(watchListData)
                setMovies(filterfFavoriteList)
                setWatchTotalPages(Math.ceil(getmovies.total_pages));
            }
        }
    }

    const filterFavoriteMovies = async (mov) => {
        const getmovies = await getFavoriteMovies('filterfav')
        if (getmovies) {
            var ids = []
            getmovies.map((q) => (
                ids.push(q.id)
            ))
            mov.map((movdata) => (
                ids.includes(movdata.id) === true ? (movdata.favorite = true, movdata.icon = <BsSuitHeartFill />) : (movdata.favorite = false, movdata.icon = <BsHeart />)
            ))
            return mov;
        }
    }

    const saveFavoriteMovie = async (id, gatFavoriteParam) => {
        const url = saveFavorites()
        const getparam = gatFavoriteParam === 'addfav' ? true : false;
        const favpost =
        {
            "media_type": "movie",
            "media_id": id,
            "favorite": getparam
        }
        await axios.post(url, favpost, { headers: headers })
            .then(data => {
                if (data.data.success === true) {
                    refesh()
                }
            });
    }

    const saveWatchMovie = async (id, getWatchParam) => {
        const url = saveWatches()
        const getparam = getWatchParam === 'addwatch' ? true : false;
        const watchpost =
        {
            "media_type": "movie",
            "media_id": id,
            "watchlist": getparam
        }
        await axios.post(url, watchpost, { headers: headers })
            .then(data => {
                if (data.data.success === true) {
                    refesh()
                }
            });
    }

    const filterWatchMovies = async (mov) => {
        const getmovies = await getWatchMovies('filterwatchlist')
        if (getmovies) {
            var ids = []
            getmovies.map((q) => (
                ids.push(q.id)
            ))
            mov.map((movdata) => (
                ids.includes(movdata.id) === true ? (movdata.watchlist = true, movdata.watchicon = <BsFillBookmarkFill />) : (movdata.watchlist = false, movdata.watchicon = <BsBookmark />)
            ))
            return mov;
        }
    }
    return (
        <PictureContext.Provider
            value={{
                movies,
                getSearchMoviesList,
                getFavoriteMovies,
                getMovieList,
                getWatchMovies,
                saveFavoriteMovie,
                saveWatchMovie,
                filterWatchMovies,
                totalPages,
                setCurrentPage,
                favoriteTotalPages,
                watchTotalPages,
                searchTotalPages,
                setFavoriteCurrentPage,
                setWatchCurrentPage,
                setSearchCurrentPage
            }}
        >
            {children}
        </PictureContext.Provider>
    )
}