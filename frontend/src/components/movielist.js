import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, setMovie } from '../actions/movieActions';
import { Carousel, Container, Badge } from 'react-bootstrap';
import { BsStarFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

function MovieList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const movies = useSelector(state => state.movie.movies);
    const loggedIn = useSelector(state => state.auth.loggedIn);

    useEffect(() => {
        if (loggedIn) {
            dispatch(fetchMovies());
        }
    }, [dispatch, loggedIn]);

    if (!loggedIn) {
        return (
            <Container className="text-center mt-5 text-light">
                <h4>Please <a href="#/signin">sign in</a> to view movies.</h4>
            </Container>
        );
    }

    if (!movies || movies.length === 0) {
        return (
            <Container className="text-center mt-5 text-light">
                <p>Loading movies...</p>
            </Container>
        );
    }

    const handleSelect = (movie) => {
        dispatch(setMovie(movie));
        navigate(`/movie/${movie._id}`);
    };

    return (
        <Container fluid className="mt-3">
            <h3 className="text-light text-center mb-3">Top Rated Movies</h3>
            <Carousel interval={4000}>
                {movies.map((movie) => (
                    <Carousel.Item key={movie._id} onClick={() => handleSelect(movie)} style={{ cursor: 'pointer' }}>
                        <div className="image-container">
                            <img
                                className="d-block w-100 carousel-img"
                                src={movie.imageUrl || 'https://via.placeholder.com/800x450?text=No+Image'}
                                alt={movie.title}
                            />
                        </div>
                        <Carousel.Caption className="carousel-caption-dark">
                            <h3>{movie.title}</h3>
                            <p>
                                <BsStarFill color="gold" />{' '}
                                {movie.avgRating ? movie.avgRating.toFixed(1) : 'No ratings'} &nbsp;|&nbsp;
                                {movie.releaseDate} &nbsp;|&nbsp;
                                <Badge bg="secondary">{movie.genre}</Badge>
                            </p>
                            <p><small>Click to view details</small></p>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>
        </Container>
    );
}

export default MovieList;
