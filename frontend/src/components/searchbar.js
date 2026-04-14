import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchMovies, setMovie } from '../actions/movieActions';
import { Form, Button, InputGroup, Card, Table, Container, Alert } from 'react-bootstrap';
import { BsStarFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchResults = useSelector(state => state.movie.searchResults);
    const loggedIn = useSelector(state => state.auth.loggedIn);
    const [searchData, setSearchData] = useState({ title: '', actorName: '' });
    const [searched, setSearched] = useState(false);

    const updateField = (e) => {
        setSearchData({ ...searchData, [e.target.id]: e.target.value });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchData.title || searchData.actorName) {
            dispatch(searchMovies(searchData));
            setSearched(true);
        }
    };

    const handleMovieClick = (movie) => {
        dispatch(setMovie(movie));
        navigate(`/movie/${movie._id}`);
    };

    if (!loggedIn) {
        return (
            <Container className="mt-5 text-center text-light">
                <Alert variant="warning">Please <a href="#/signin">sign in</a> to search movies.</Alert>
            </Container>
        );
    }

    return (
        <Container className="mt-4">
            <h3 className="text-light mb-4">Search Movies</h3>
            <Form onSubmit={handleSearch}>
                <InputGroup className="mb-3">
                    <Form.Control
                        id="title"
                        placeholder="Search by movie title..."
                        value={searchData.title}
                        onChange={updateField}
                    />
                    <Form.Control
                        id="actorName"
                        placeholder="Search by actor name..."
                        value={searchData.actorName}
                        onChange={updateField}
                    />
                    <Button type="submit" variant="primary">Search</Button>
                </InputGroup>
            </Form>

            {searched && searchResults && searchResults.length === 0 && (
                <p className="text-muted text-center">No movies found. Try a different search term.</p>
            )}

            {searchResults && searchResults.length > 0 && (
                <Card className="bg-dark text-light">
                    <Card.Header>
                        Search Results — {searchResults.length} movie{searchResults.length !== 1 ? 's' : ''} found
                    </Card.Header>
                    <Card.Body className="p-0">
                        <Table striped bordered hover variant="dark" responsive className="mb-0">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Year</th>
                                    <th>Genre</th>
                                    <th>Avg Rating</th>
                                </tr>
                            </thead>
                            <tbody>
                                {searchResults.map((movie) => (
                                    <tr key={movie._id} style={{ cursor: 'pointer' }} onClick={() => handleMovieClick(movie)}>
                                        <td style={{ color: '#61dafb' }}>{movie.title}</td>
                                        <td>{movie.releaseDate}</td>
                                        <td>{movie.genre}</td>
                                        <td>
                                            <BsStarFill color="gold" />{' '}
                                            {movie.avgRating ? movie.avgRating.toFixed(1) : 'N/A'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            )}
        </Container>
    );
}

export default SearchBar;
