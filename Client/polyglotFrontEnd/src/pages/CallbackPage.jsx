import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";

const CallbackPage = () =>
{
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (code) {
            fetch(`http://localhost:8080/callback?code=${code}`)
            .then(response => response.json())
            .then(data => {
                navigate('/'); // redirect to home page after log in

            }
            )
            .catch(error => console.error(error));
        }

    } ,[navigate]);
    return (
        <div className="container"> 
        <p>Logging you in... </p>
        </div>
    );

    


}
export default CallbackPage

