import React from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useFetchLoginData } from '../hooks/useFetchLoginData';
import { useNavigate } from 'react-router-dom';

function Login() {
    const {
        loading,
        error,
        loginData,
        setLoginData,
        login,
    } = useFetchLoginData();
    const navigate = useNavigate()

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setLoginData((prevLoginData) => ({
            ...prevLoginData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const success = await login(loginData.username, loginData.password);
        if (success) {
            navigate('/customer')
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit} className='d-flex flex-column'>
                <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        name="username"
                        value={loginData.username}
                        onChange={handleInputChange}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter a username.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="password" className="mb-4">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={loginData.password}
                        onChange={handleInputChange}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter a password.
                    </Form.Control.Feedback>
                </Form.Group>
                <Button type="submit" variant="primary" disabled={loading}>
                    {loading ? 'Logging in...' : 'Log In'}
                </Button>
            </Form>
        </div>
    );
}

export default Login;
