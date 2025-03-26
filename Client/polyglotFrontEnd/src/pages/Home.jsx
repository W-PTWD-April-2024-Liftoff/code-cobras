import React, { useEffect, useState } from 'react'
import Filter from '../layout/Filter'
import { Link, useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart} from 'react-icons/fa';
import api from '../api/languages';

export default function Home() {
    let navigate = useNavigate();

    const [error,setError] = useState([]);
    const [languages,setLanguages] = useState([]);
    const [comments, setComments] = useState([]);

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

    const toggleFavorite = (languageId) => {
        // Update the favorite status in your state 
        // Add API call
        setLanguages(prevLanguages => 
            prevLanguages.map(language =>
                language.id === languageId 
                    ? { ...language, isFavorited: !language.isFavorited }
                    : language
            )
        );
    };
    

    return (
        <div className='container'>
            <h1>Welcome to Polyglot!</h1>
            <p>Our community is focused on creating a welcoming enviroment to individuals new and experienced in the world of 
                creating constructed languages. From Dothraki to Sindarin Elvish, we've got it all! 
            </p>
            <div className="container-xxl bd-gutter mt-3 my-md-4 bd-layout">
                <aside className='bd-sidebar' data-bs-spy="scroll"><Filter></Filter></aside>
                <main className="bd-main order-1" data-bs-spy="scroll">
                {languages && languages.length > 0 ? (
                        languages.map((language, index) => (
                            <div className="m-5 p-2 shadow border-2 rounded" key={index}>
                                <div className="card position-relative">
                                    {/* Profile Image */}
                                    <img 
                                        src="https://images.photowall.com/products/74785/black-dragon-at-beach.jpg?h=699&q=85" // Replace with language-specific image
                                        alt="Profile"
                                        className="position-absolute rounded-circle"
                                        style={{
                                            top: '10px',
                                            left: '10px',
                                            width: '50px',
                                            height: '50px',
                                        }}
                                    />

                                    {/* Heart Icon: Toggle between filled and outlined heart */}
                                    {language.isFavorited ? (
                                        <FaHeart
                                            className="position-absolute text-danger"
                                            style={{
                                                top: '10px',
                                                right: '10px',
                                                fontSize: '24px',
                                                cursor: 'pointer',
                                            }}
                                            onClick={() => toggleFavorite(language.id)} // Toggle favorite status
                                        />
                                    ) : (
                                        <FaRegHeart
                                            className="position-absolute text-danger"
                                            style={{
                                                top: '10px',
                                                right: '10px',
                                                fontSize: '24px',
                                                cursor: 'pointer',
                                            }}
                                            onClick={() => toggleFavorite(language.id)} // Toggle favorite status
                                        />
                                    )}

                                    {/* Language Name and Link */}
                                    <div className="card-body pt-3">
                                        <h5 className="card-title mb-3">
                                            <Link to={`http://localhost:5173/viewlanguage?id=${language.id}`} className="text-dark">{language.name}</Link>
                                        </h5>
                                        <p className="card-text">{language.description}</p>
                                    </div>

                                    {/* Comment Section */}
                                    <div className="card-footer">
                                        <h6>Comments</h6>
                                        {/* Comment Entries */}
                                        <div className="comments-list">
                                            <div className="comment mb-2">
                                                <div className="d-flex justify-content-start align-items-center">
                                                    <strong className="me-2">User1:</strong>
                                                    <span className="text-muted">This language is amazing!</span>
                                                </div>
                                            </div>
                                            <div className="comment mb-2">
                                                <div className="d-flex justify-content-start align-items-center">
                                                    <strong className="me-2">User2:</strong>
                                                    <span className="text-muted">I really like how the grammar works!</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Comment Input */}
                                        <div className="input-group mt-3">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Add a comment..."
                                            />
                                            <button className="btn btn-outline-secondary">Post</button>
                                        </div>
                                    </div>
                                </div>
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