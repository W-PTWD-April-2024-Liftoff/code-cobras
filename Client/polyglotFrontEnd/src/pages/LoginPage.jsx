import React, { useState } from "react";
import axios from 'axios';
import { useAuth } from '../security/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    
    const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const GOOGLE_REDIRECT_URI = import.meta.env.VITE_GOOGLE_REDIRECT_URI;
    const GOOGLE_AUTH_URL = `http://localhost:8080/oauth2/authorization/google`;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await axios.post('http://localhost:8080/login', {
                username,
                password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            if (response.status === 200) {
                const [token, ...userData] = response.data.split(":");
                login(token, userData.join(':'));
                navigate("/languages");
            }
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded
                setError(error.response.data.message || 'Login failed. Please try again.');
            } else if (error.request) {
                // The request was made but no response was received
                setError('No response from server. Please try again.');
            } else {
                // Something happened in setting up the request
                setError('An error occurred. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };    

    return (
        <div className="login-container">
            <div className="text-center mt-5">
                <h1>Welcome!</h1>
                <p>Please log in to continue.</p>
                <a href={GOOGLE_AUTH_URL} className="btn btn-primary">
                    Login with Google
                </a>
            </div>
            
            <div className="divider">
                <span className="divider-text">or</span>
            </div>
            
            <div className="login-form">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input 
                            type="text" 
                            name="username" 
                            placeholder="Username" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="Password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required
                        />
                    </div>
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                {error && <p className="error-message">{error}</p>}
                <p className="register-link">
                    Don't have an account? <Link to="/register">Register here</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;