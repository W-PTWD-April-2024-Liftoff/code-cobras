import React, { useEffect, useState } from 'react'
import Filter from '../layout/Filter'
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/languages';

export default function Home() {
    let navigate = useNavigate();

    const [languages,setLanguages] = useState([]);
    const [error,setError] = useState([]);

    useEffect(()=>{
        loadLanguages();        
    }, []); 

    const loadLanguages = async () => {
        try {
            const response = await fetch(`http://localhost:8080/?accessFlag=public`);
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setLanguages(data); // Save the response data into state
          } catch (err) {
            setError(err.message);
          }
    }

    return (
        <div className='container'>
            <h1>Welcome to Polyglot!</h1>
            <p>Our community is focused on creating a welcoming enviroment to individuals new and experienced in the world of 
                creating constructed languages. From Dothraki to Sindarin Elvish, we've got it all! 
            </p>
            <div className="container-xxl bd-gutter mt-3 my-md-4 bd-layout">
                <aside className='bd-sidebar' data-bs-spy="scroll"><Filter></Filter></aside>
                <main className="bd-main order-1" data-bs-spy="scroll">
                    { languages && languages.length > 0 ? (
                            languages.map((language, index) => (
                                
                                <div className="m-5 p-2 shadow border-2 rounded " key={index}>
                                    <div>
                                        <div className="position-relative p-2 border rounded shadow">
                                            <img  className="img.fluid img-thumbnail" alt="alt-text-here"/>
                                            <p>Image will go here</p>
                                        </div>
                                        <Link className="mx-2" to={`http://localhost:5173/viewlanguage?id=${language.id}`}>{language.name}</Link>
                                    </div>
                                    <p>{language.description}</p>
                                    
                                </div>
                            ))
                        ) : (
                            <div>
                                <p>No languages to display</p>
                            </div>
                    )}
                </main>
            </div>
        </div>
    )
}