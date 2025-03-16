import React, { useState } from "react";
import axios from 'axios'
import { useAuth } from '../security/AuthContext';
import { Link, useNavigate } from 'react-router-dom'

const LoginPage = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');
    const navigate = useNavigate()
    const {login} = useAuth();

    const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;
    const GITHUB_REDIRECT_URI = import.meta.env.VITE_GITHUB_REDIRECT_URI;
    const GITHUB_AUTH_URL = `https://github.com/login/oauth/authorize?response_type=code&client_id=${GITHUB_CLIENT_ID}&scope=user:user&redirect_uri=${GITHUB_REDIRECT_URI}`;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('')

        const loginData = {
            username,
            password
        }        

        try {
            const response = await axios.post('http://localhost:8080/login', loginData);
            //const token = response.data.token;
            //localStorage.setItem('token', token);
            //navigate("/home");
            // Redirect to home page or other protected route
            if (response.status === 200){
                console.log("completed!");
                login();
                navigate("/");
            }
            else {
                const errorData = await response.json()
                setError(errorData.message || 'Login failed. Please retry!')
            }
           
        } catch (error) {
            // Handle error
            setError('And error occurred. please retry')
        }
    };    

    return (
        <div className="col">
        <div className="text-center mt-5">
            <h1>Welcome! </h1>
            <p>Please log in to continue.</p>
            <a href={GITHUB_AUTH_URL} className="btn btn-primary">
                Login with Github
            </a>
        </div>
        <div className="vl">
       <span className="vl-innertext">or</span>
   </div>
   
   <div className="row">
       <form onSubmit={handleSubmit}>
           <input type="text" name="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
           <input type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
           <button type="submit">Login</button>
       </form>
   </div> 
   </div>               
    );

};

export default LoginPage;