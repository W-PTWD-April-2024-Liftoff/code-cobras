import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function ViewLanguage() {
    let navigate = useNavigate();

    const [language,setLanguage] = useState({});
    const [error,setError] = useState([]);
    

    useEffect(()=>{
        const queryParams = window.location.search;
        const url = `http://localhost:8080/viewlanguage${queryParams}`;
        loadLanguages(url);        
    }, []); 

    const loadLanguages = async (url) => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response unsuccessful');
            }
            const data = await response.json();
            console.log("checkpoint")
            setLanguage(data); // Save the response data into state
            } catch (err) {
            setError(err.message);
            }

    }

    
    return (
        <div className="m-5 p-2 shadow border-2 rounded">
            <div>
                <div className="position-relative p-2 border rounded shadow">
                    <img  className="img.fluid img-thumbnail" alt="alt-text-here"/>
                    <p>Image will go here</p>
                </div>
            </div>
            <h4>{language?.name}</h4>
            <p>{language?.description}</p> 
            {error && <p className="text-danger">{error}</p>} 
        </div>
        
    )
}