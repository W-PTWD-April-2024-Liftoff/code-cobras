import React from "react";

const LoginPage = () => {
    const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;
    const GITHUB_REDIRECT_URI = import.meta.env.VITE_GITHUB_REDIRECT_URI;
    const GITHUB_AUTH_URL = `https://github.com/login/oauth/authorize?response_type=code&client_id=${GITHUB_CLIENT_ID}&scope=user:user&redirect_uri=${GITHUB_REDIRECT_URI}`;

    return (
        <div className="text-center mt-5">
            <h1>Welcome! </h1>
            <p>Please log in to continue.</p>
            <a href={GITHUB_AUTH_URL} className="btn btn-primary">
                Login with Github
            </a>
        </div>
    );

};

export default LoginPage;