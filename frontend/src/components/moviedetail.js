import React from 'react';
import { useSelector } from 'react-redux';
import { Card, ListGroup, ListGroupItem, Image, Table, Container } from 'react-bootstrap';
import { BsStarFill } from 'react-icons/bs';
import ReviewForm from './reviewform';

function MovieDetail() {
    const selectedMovie = useSelector(state => state.movie.selectedMovie);

    if (!selectedMovie) {
        return (
            <Container className="text-center mt-5 text-light">
                <p>Loading movie...</p>
            </Container>
        );
    }

    return (
        <Container className="mt-4 mb-5">
            <Card className="bg-dark text-light">
                <Card.Header as="h4">{selectedMovie.title}</Card.Header>

                <Card.Body className="text-center">
                    <Image
                        src={selectedMovie.imageUrl || 'https://via.placeholder.com/300x450?text=No+Image'}
                        alt={selectedMovie.title}
                        style={{ maxHeight: '450px', objectFit: 'contain' }}
                        thumbnail
                    />
                </Card.Body>

                <ListGroup variant="flush">
                    <ListGroupItem className="bg-dark text-light">
                        <strong>Release Year:</strong> {selectedMovie.releaseDate}
                    </ListGroupItem>
                    <ListGroupItem className="bg-dark text-light">
                        <strong>Genre:</strong> {selectedMovie.genre}
                    </ListGroupItem>
                    <ListGroupItem className="bg-dark text-light">
                        <strong>Cast:</strong>
                        <ul className="mt-2 mb-0">
                            {selectedMovie.actors && selectedMovie.actors.map((actor, i) => (
                                <li key={i}>
                                    <strong>{actor.actorName}</strong> as {actor.characterName}
                                </li>
                            ))}
                        </ul>
                    </ListGroupItem>
                    <ListGroupItem className="bg-dark text-light">
                        <h5 className="mb-0">
                            <BsStarFill color="gold" />{' '}
                            Average Rating:{' '}
                            {selectedMovie.avgRating
                                ? selectedMovie.avgRating.toFixed(1) + ' / 5'
                                : 'No ratings yet'}
                        </h5>
                    </ListGroupItem>
                </ListGroup>

                {/* Reviews Grid */}
                <Card.Body>
                    <h5 className="mb-3">Reviews</h5>
                    {selectedMovie.reviews && selectedMovie.reviews.length > 0 ? (
                        <Table striped bordered hover variant="dark" responsive>
                            <thead>
                                <tr>
                                    <th>Username</th>
                                    <th>Rating</th>
                                    <th>Review</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedMovie.reviews.map((review, i) => (
                                    <tr key={i}>
                                        <td>{review.username}</td>
                                        <td><BsStarFill color="gold" /> {review.rating}</td>
                                        <td>{review.review}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    ) : (
                        <p className="text-muted">No reviews yet. Be the first!</p>
                    )}
                </Card.Body>

                {/* Review Entry Form */}
                <Card.Body>
                    <h5 className="mb-3">Add Your Review</h5>
                    <ReviewForm movieId={selectedMovie._id} />
                </Card.Body>
            </Card>
        </Container>
    );
}

export default MovieDetail;
