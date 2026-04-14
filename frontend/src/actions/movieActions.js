import actionTypes from '../constants/actionTypes';

const env = process.env;

function authHeader() {
    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    };
}

export function moviesFetched(movies) {
    return { type: actionTypes.FETCH_MOVIES, movies };
}

export function movieFetched(selectedMovie) {
    return { type: actionTypes.FETCH_MOVIE, selectedMovie };
}

export function movieSet(selectedMovie) {
    return { type: actionTypes.SET_MOVIE, selectedMovie };
}

export function setMovie(movie) {
    return dispatch => {
        dispatch(movieSet(movie));
    }
}

export function fetchMovies() {
    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/movies?reviews=true`, {
            method: 'GET',
            headers: authHeader(),
            mode: 'cors'
        }).then(response => {
            if (!response.ok) throw Error(response.statusText);
            return response.json();
        }).then(res => {
            dispatch(moviesFetched(res));
        }).catch(e => console.log(e));
    }
}

export function fetchMovie(movieId) {
    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/movies/${movieId}?reviews=true`, {
            method: 'GET',
            headers: authHeader(),
            mode: 'cors'
        }).then(response => {
            if (!response.ok) throw Error(response.statusText);
            return response.json();
        }).then(res => {
            dispatch(movieFetched(res));
        }).catch(e => console.log(e));
    }
}

export function addReview(reviewData) {
    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/reviews`, {
            method: 'POST',
            headers: authHeader(),
            body: JSON.stringify(reviewData),
            mode: 'cors'
        }).then(response => {
            if (!response.ok) throw Error(response.statusText);
            return response.json();
        }).then(() => {
            dispatch({ type: actionTypes.ADD_REVIEW });
            dispatch(fetchMovie(reviewData.movieId));
        }).catch(e => console.log(e));
    }
}

export function searchMovies(searchData) {
    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/movies/search`, {
            method: 'POST',
            headers: authHeader(),
            body: JSON.stringify(searchData),
            mode: 'cors'
        }).then(response => {
            if (!response.ok) throw Error(response.statusText);
            return response.json();
        }).then(res => {
            dispatch({ type: actionTypes.SEARCH_MOVIES, movies: res });
        }).catch(e => console.log(e));
    }
}
