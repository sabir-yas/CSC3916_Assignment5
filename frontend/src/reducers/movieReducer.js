import constants from '../constants/actionTypes';

let initialState = {
    movies: [],
    selectedMovie: null,
    searchResults: []
}

const movieReducer = (state = initialState, action) => {
    let updated = Object.assign({}, state);
    switch (action.type) {
        case constants.FETCH_MOVIES:
            updated['movies'] = action.movies;
            return updated;
        case constants.FETCH_MOVIE:
            updated['selectedMovie'] = action.selectedMovie;
            return updated;
        case constants.SET_MOVIE:
            updated['selectedMovie'] = action.selectedMovie;
            return updated;
        case constants.ADD_REVIEW:
            return updated;
        case constants.SEARCH_MOVIES:
            updated['searchResults'] = action.movies;
            return updated;
        default:
            return state;
    }
}

export default movieReducer;
