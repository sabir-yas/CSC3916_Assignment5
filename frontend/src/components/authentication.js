import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../actions/authActions';
import { Tab, Tabs, Button, Container } from 'react-bootstrap';
import Login from './login';
import Register from './register';
import { useNavigate } from 'react-router-dom';

function Authentication() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loggedIn = useSelector(state => state.auth.loggedIn);
    const username = useSelector(state => state.auth.username);

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate('/');
    };

    if (loggedIn) {
        return (
            <Container className="auth-container mt-5 text-center text-light">
                <h4>Logged in as <strong>{username}</strong></h4>
                <Button variant="danger" onClick={handleLogout} className="mt-3">
                    Logout
                </Button>
            </Container>
        );
    }

    return (
        <Container className="auth-container mt-5">
            <Tabs defaultActiveKey="login" className="dark-tabs mb-3">
                <Tab eventKey="login" title="Login">
                    <Login />
                </Tab>
                <Tab eventKey="register" title="Register">
                    <Register />
                </Tab>
            </Tabs>
        </Container>
    );
}

export default Authentication;
