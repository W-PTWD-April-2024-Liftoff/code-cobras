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
    const [filteredLanguages, setFilteredLanguages] = useState([]);

    const [filters, setFilters] = useState({
        consonant: "",
        vowel: "",
        language: ""
      });

      const handleFilterChange = (newFilters) => {
        console.log(newFilters);
        setFilters(newFilters);
      };      

    useEffect(()=>{
        loadLanguages();        
    }, []); 

    useEffect(()=>{
        filterLanguages();  
        setTimeout(() => window.scrollTo(0, 0), 0);  
    }, [filters]);     

    const loadLanguages = async () => {
        try {
            console.log(filters.language);
            //let languageQryString = "";
            //if (filters.language != ""){languageQryString = "&name=" + filters.language}
            const response = await fetch(`http://localhost:8080/?accessFlag=public`);  // + languageQryString
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setLanguages(data);
            setFilteredLanguages(data); // Initialize filtered data with all data 
            console.log(data);
          } catch (err) {
            setError(err.message);
          }
    }

    const filterLanguages = (event) => {
        //const searchTerm = event.target.value.toLowerCase();
        console.log(languages);
        const newFilteredData = languages.filter(item =>
          item.name.toLowerCase().includes(filters.language.toLowerCase())
        );
        //.map(item => ({ ...item, name: item.name.trim() }));
        setFilteredLanguages(newFilteredData);
        //console.log(filteredLanguages.length);
        //console.log(newFilteredData.length);
        
      };    

    const toggleFavorite = (languageId) => {
        // Update useState 
        // Add API call
        setLanguages(oldLanguages => 
            oldLanguages.map(language =>
                language.id === languageId 
                    ? { ...language, isFavorited: !language.isFavorited }
                    : language
            )
        );
    };

    const colorList = [
        "#FFDAB9", // Peach Pink
        "#800000", // Maroon
        "#FF1493", // Deep Pink
        "#40E0D0", // Turquoise
        "#8A2BE2", // BlueViolet
        "#F4A300", // Sandy Brown
        "#B22222", // Firebrick
    ];

    const getRandomColor = () => {
        const randomIndex = Math.floor(Math.random() * colorList.length);
        return colorList[randomIndex];
    };

    const getMimeTypeFromBase64 = (base64) => {
        if (base64.startsWith('iVBOR')) {
            return 'image/png'; 
        } else if (base64.startsWith('/9j/')) {
            return 'image/jpeg';
        }
        return 'image/jpeg'; // Default to JPEG
    };


    

    return (
        <div className='container'>
            <h1>Welcome to Polyglot!</h1>
            <p>Our community is focused on creating a welcoming enviroment to individuals new and experienced in the world of 
                creating constructed languages. From Dothraki to Sindarin Elvish, we've got it all! 
            </p>
            <div className="container-xxl bd-gutter mt-3 my-md-4 bd-layout">
                <aside className='bd-sidebar' data-bs-spy="scroll"><Filter languages={languages} filters={filters} onValuesChange={handleFilterChange}></Filter></aside>
                <main className="bd-main order-1" data-bs-spy="scroll">
                {filteredLanguages && filteredLanguages.length > 0 ? (
                        filteredLanguages.map((language, index) => (
                            <div className="m-5 p-2 shadow border-2 rounded" key={index}>
                                <div className="card position-relative">
                                    {/* Language Profile Picture */}
                                    {language.image ? (
                                        <img 
                                        src={`data:${getMimeTypeFromBase64(language.image)};base64,${language.image}`}
                                        alt="ProfilePicture"
                                        className="position-absolute rounded-circle"
                                        style={{
                                            top: '10px',
                                            left: '10px',
                                            width: '50px',
                                            height: '50px',
                                        }}
                                    />
                                    ) : (
                                        <div
                                            className="position-absolute rounded-circle"
                                            style={{
                                                top: '10px',
                                                left: '10px',
                                                width: '50px',
                                                height: '50px',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                backgroundColor: getRandomColor(), 
                                                color: 'white',
                                                fontSize: '24px',
                                                fontWeight: 'bold',
                                                fontFamily: "Lobster", 
                                            }}
                                        >
                                            {language.name.charAt(0).toUpperCase()}
                                        </div>
                                    )}

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