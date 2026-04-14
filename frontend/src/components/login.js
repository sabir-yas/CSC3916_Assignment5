import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { submitLogin } from '../actions/authActions';
import { Form, Button } from 'react-bootstrap';

function Login() {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({ username: '', password: '' });

    const updateField = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(submitLogin(formData));
    };

    return (
        <div className="login-container">
            <Form onSubmit={handleSubmit} className="login-form">
                <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter username"
                        value={formData.username}
                        onChange={updateField}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={updateField}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100">
                    Login
                </Button>
            </Form>
        </div>
    );
}

export default Login;
