import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { submitRegister } from '../actions/authActions';
import { Form, Button } from 'react-bootstrap';

function Register() {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({ name: '', username: '', password: '' });

    const updateField = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(submitRegister(formData));
    };

    return (
        <div className="register-container">
            <Form onSubmit={handleSubmit} className="register-form">
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={updateField}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Choose a username"
                        value={formData.username}
                        onChange={updateField}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Choose a password"
                        value={formData.password}
                        onChange={updateField}
                        required
                    />
                </Form.Group>
                <Button variant="success" type="submit" className="w-100">
                    Sign Up
                </Button>
            </Form>
        </div>
    );
}

export default Register;
