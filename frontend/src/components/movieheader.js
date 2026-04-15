import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../actions/authActions';

function MovieHeader() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loggedIn = useSelector(state => state.auth.loggedIn);
    const username = useSelector(state => state.auth.username);

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate('/');
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
            <Container>
                <Navbar.Brand as={NavLink} to="/">🎬 Yaseer's Movie App</Navbar.Brand>
                <Navbar.Toggle aria-controls="main-nav" />
                <Navbar.Collapse id="main-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={NavLink} to="/movielist">Movies</Nav.Link>
                        <Nav.Link as={NavLink} to="/search">Search</Nav.Link>
                    </Nav>
                    <Nav>
                        {loggedIn ? (
                            <>
                                <Navbar.Text className="me-3 text-light">
                                    Hi, <strong>{username}</strong>
                                </Navbar.Text>
                                <Button variant="outline-danger" size="sm" onClick={handleLogout}>
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <Nav.Link as={NavLink} to="/signin">Login / Sign Up</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default MovieHeader;
