import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchMovie } from '../actions/movieActions';
import MovieDetail from './moviedetail';

function Movie() {
    const { movieId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        if (movieId) {
            dispatch(fetchMovie(movieId));
        }
    }, [dispatch, movieId]);

    return <MovieDetail />;
}

export default Movie;
