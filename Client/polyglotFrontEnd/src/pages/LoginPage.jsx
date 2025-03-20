import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../security/AuthContext";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css"; // Import a CSS file for styling

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const GOOGLE_REDIRECT_URI = import.meta.env.VITE_GOOGLE_REDIRECT_URI;

  const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=profile email`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const loginData = {
      username,
      password,
    };

    try {
      const response = await axios.post("http://localhost:8080/login", loginData);

      if (response.status === 200) {
        console.log("Login successful!");
        login();
        navigate("/");
      } else {
        setError("Login failed. Please retry!");
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "An error occurred. Please retry."
      );
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Welcome!</h1>
        <p>Please log in to continue.</p>

        {/* Google Login Button */}
        <a href={GOOGLE_AUTH_URL} className="google-login-btn">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="Google Logo"
          />
          <span>Login with Google</span>
        </a>

        <div className="divider">
          <span>or</span>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        {/* Error Message */}
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default LoginPage;