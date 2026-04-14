import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addReview } from '../actions/movieActions';
import { Form, Button, Alert } from 'react-bootstrap';
import { BsStarFill } from 'react-icons/bs';

function ReviewForm({ movieId }) {
    const dispatch = useDispatch();
    const loggedIn = useSelector(state => state.auth.loggedIn);
    const username = useSelector(state => state.auth.username);

    const [reviewData, setReviewData] = useState({ rating: '', review: '' });
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const updateField = (e) => {
        setReviewData({ ...reviewData, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        const ratingNum = parseInt(reviewData.rating, 10);
        if (!reviewData.review.trim()) {
            setError('Please enter a review comment.');
            return;
        }
        if (!reviewData.rating || ratingNum < 1 || ratingNum > 5) {
            setError('Please select a rating between 1 and 5.');
            return;
        }

        dispatch(addReview({
            movieId: movieId,
            review: reviewData.review,
            rating: ratingNum
        }));

        setReviewData({ rating: '', review: '' });
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
    };

    if (!loggedIn) {
        return (
            <Alert variant="warning">
                Please <a href="#/signin">sign in</a> to leave a review.
            </Alert>
        );
    }

    return (
        <Form onSubmit={handleSubmit} className="bg-secondary p-3 rounded">
            <p className="text-light mb-2">
                Reviewing as: <strong>{username}</strong>
            </p>

            {submitted && (
                <Alert variant="success" dismissible onClose={() => setSubmitted(false)}>
                    Review submitted successfully!
                </Alert>
            )}
            {error && (
                <Alert variant="danger" dismissible onClose={() => setError('')}>
                    {error}
                </Alert>
            )}

            <Form.Group controlId="rating" className="mb-3">
                <Form.Label className="text-light">
                    <BsStarFill color="gold" /> Rating (1–5)
                </Form.Label>
                <Form.Select value={reviewData.rating} onChange={updateField} required>
                    <option value="">Select a rating...</option>
                    <option value="1">1 – Poor</option>
                    <option value="2">2 – Fair</option>
                    <option value="3">3 – Good</option>
                    <option value="4">4 – Very Good</option>
                    <option value="5">5 – Excellent</option>
                </Form.Select>
            </Form.Group>

            <Form.Group controlId="review" className="mb-3">
                <Form.Label className="text-light">Review</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Write your review here..."
                    value={reviewData.review}
                    onChange={updateField}
                    required
                />
            </Form.Group>

            <Button type="submit" variant="primary">
                Submit Review
            </Button>
        </Form>
    );
}

export default ReviewForm;
