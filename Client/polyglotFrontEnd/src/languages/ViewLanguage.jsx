import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import { FaHeart, FaRegHeart} from 'react-icons/fa';

export default function ViewLanguage() {
    let navigate = useNavigate();

    const [language,setLanguage] = useState({});
    const [error,setError] = useState([]);
    const [comments, setComments] = useState([]);
    

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
            setLanguage(data); // Save the response data into state
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

    const loadComments = async () => {
        try {
            const response = await fetch(`http://localhost:8080/viewLanguage`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setComments(data);
        } catch (err) {
            setError(err.message);
        }
    } 

    const handleBackButton = () => {
        navigate(-1)
;    }

    
    return (
        <div>
            <div className='d-flex justify-content-start m-4'>
                <Link className="btn btn-outline-danger ms-0" onClick={handleBackButton}>Back</Link>     
            </div>
                
            <div className="m-5 p-2 shadow border-2 rounded" >
                    <div className="card position-relative">
                        {/* Language Profile Picture */}
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

                        {/* Toggle Favorite */}
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
                            <h5 className="card-title mb-3 text-dark">{language.name}</h5>
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



        </div>
        

        
    )
}