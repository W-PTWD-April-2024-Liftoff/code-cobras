import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";

const CallbackPage = () =>
{
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (code) {
            //send autorization code to backend
            fetch(`http://localhost:8080/callback?code=${code}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify({ code }),
            })
            .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to exchange code for token');
              }
              return response.json();
            })
            .then((data) => {
              // Save the access token
              localStorage.setItem('accessToken', data.accessToken);
    
              
              navigate('/');
            })
            .catch((error) => {
              console.error('Error during OAuth2 callback:', error);
              navigate('/login'); // Redirect to login page on error
            });
        } else {
          navigate('/login');
        }
      }, [navigate]);
    
      return (
        <div className="container">
          <p>Logging you in...</p>
        </div>
      );
    };
    
    export default CallbackPage;

