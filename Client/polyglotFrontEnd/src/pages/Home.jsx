import React, { useEffect, useState } from 'react'
import Filter from '../layout/Filter'
import { Link, useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaPen, FaTrash, FaPlus } from 'react-icons/fa';
import api from '../api/languages';
import { useAuth } from '../security/AuthContext';

export default function Home() {
    let navigate = useNavigate();

    const [error,setError] = useState([]);
    const [languages,setLanguages] = useState([]);
    const [colorMap, setColorMap] = useState(new Map());
    const [comments, setComments] = useState([]); //All comments
    const [newComment, setNewComment] = useState('');
    const [vowelData, setVowelData] = useState([]);
    const [consonantData, setConsonantData] = useState([]);
    const [syllableData, setSyllableData] = useState([]);
    const {loggedInUser} = useAuth();
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
        loadComments(); 
    }, []);

    useEffect(()=>{
        loadVowels();        
    }, []);
    
    useEffect(()=>{
        loadConsonants();        
    }, []);

    useEffect(()=>{
        loadSyllables();        
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

            const newColorMap = new Map();
            data.forEach((language) => {
                if (!newColorMap.has(language.id)) {
                    newColorMap.set(language.id, getRandomColor());
                }
            })
            setColorMap(newColorMap);
          } catch (err) {
            setError(err.message);
        }
    }

    const loadComments = async () => {
        try {
            const response = await fetch(`http://localhost:8080/comments?accessFlag=public`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            } 
            const data = await response.json();
            setComments(data);
        } catch (err) {
            setError(err.message);
        }
    }

    const loadVowels = async () => {
        try {
            const response = await fetch(`http://localhost:8080/language/allvowels`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log('Vowel Data:', data);
            setVowelData(data); 
        } catch (err) {
            setError(err.message);
        }
    };

    const loadConsonants = async () => {
        try {
            const response = await fetch(`http://localhost:8080/language/allconsonants`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log('Consonant Data:', data);
            setConsonantData(data); 
        } catch (err) {
            setError(err.message);
        }
    };

    const loadSyllables = async () => {
        try {
            const response = await fetch(`http://localhost:8080/language/allsyllables`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log('Syllable Data:', data);
            setSyllableData(data); 
        } catch (err) {
            setError(err.message);
        }
    };

    const filterLanguages = (event) => {
        //const searchTerm = event.target.value.toLowerCase();

        const languageIdsByVowel = [];

        if(filters.vowel != ""){
            for (const languageId in vowelData) {
            for (const obj of vowelData[languageId]) {
                if (obj.hasOwnProperty('name')) {
                if (obj['name'].includes(filters.vowel)) {
                    languageIdsByVowel.push(parseInt(languageId));
                    break;
                }
                }
            }
            }  
        }
        const languageIdsByConsonant = [];

        if(filters.consonant != ""){
            for (const languageId in consonantData) {
            for (const obj of consonantData[languageId]) {
                if (obj.hasOwnProperty('name')) {
                if (obj['name'].includes(filters.consonant)) {
                    languageIdsByConsonant.push(parseInt(languageId));
                    break;
                }
                }
            }
            }   
        }
        
        //console.log(filters.language);
        const languageIdsByLanguage = [];

        if(filters.language != 0){
            languageIdsByLanguage.push(parseInt(filters.language));

        } 
        
        //console.log(languageIdsByLanguage);

        //console.log(languages);
        let newFilteredData;
        if(languageIdsByLanguage.length === 0 && languageIdsByVowel.length === 0 && languageIdsByConsonant.length === 0){
            newFilteredData= languages
        } 
        else {
            newFilteredData = languages
            .filter(
                item => 
                    //item.name.toLowerCase().includes(filters.language.toLowerCase())  ||
                languageIdsByLanguage.includes(item.id  )
                || languageIdsByVowel.includes(item.id  )  
                || languageIdsByConsonant.includes(item.id )  
            )
            //.map(item => item.trim())
        }

        //.filter(item=>item.consonant.toLowerCase().includes(filters.consonant.toLowerCase))
        //.filter(item=>item.vowel.toLowerCase().includes(filters.vowel.toLowerCase));
        //.map(item => ({ ...item, name: item.name.trim() }));
        console.log(newFilteredData);
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

    //Image display
    const getMimeTypeFromBase64 = (base64) => {
        if (base64.startsWith('iVBOR')) {
            return 'image/png'; 
        } else if (base64.startsWith('/9j/')) {
            return 'image/jpeg';
        }
        return 'image/jpeg'; // Default to JPEG
    };

    //Syllable display logic
    const renderSyllableItems = (length, requiredLength) => {
        const requiredC = Array.from({ length: requiredLength }, (_, i) => "C");
        const unrequiredC = Array.from({ length: length - requiredLength }, (_, i) => "( C )");

        return [...requiredC, ...unrequiredC].map((item, index) => (
            <span key={index}>{item} </span>
        ));
    };

    //Comments
    const onInputChange=(e)=>{
        setNewComment(e.target.value); //Update state
    }

    //Post new comment
    const onSubmit = async (e, languageName) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('username', loggedInUser);
        formData.append('commentBody', newComment);
        formData.append('accessFlag', 'public');
        formData.append('languageName', languageName);
            
        try {
            const response = await api.post("http://localhost:8080/addcomment", formData);
            console.log(response.data);
            loadComments(); // update state to include posted comment
            navigate("/");
        } catch (error) {
            console.log(`Error: ${error.message}`);
        }
        setNewComment(''); // reset comment state
    }
       
    //Delete Comment
    const [deletePopup, setDeletePopup] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    const handleDelete = (id) => {
        setDeletePopup(true); // Show the popup 
        setItemToDelete(id); // Set the item to delete        
    };
    const confirmDelete = async () => {
        console.log(`Attempting to delete comment with id: ${itemToDelete}`);
        try{
            await api.delete(`http://localhost:8080/comment/${itemToDelete}`);
            console.log(`Item ${itemToDelete} deleted`);
            loadComments();
        } catch (error) {
            console.log(error.message);
        }
        // Hide the popup after deletion
        setDeletePopup(false);
        setItemToDelete(null);
        navigate("/");
    };
    //Cancel delete action
    const cancelDelete = () => {
        setDeletePopup(false);
        setItemToDelete(null);
    };

    //Edit Comment
    const [editPopup, setEditPopup] = useState(false);
    const [itemToEdit, setItemToEdit] = useState(null);
    const [oldComment, setOldComment] = useState('');
    const [editComment, setEditComment] = useState('');
    const [editCommentLang, setEditCommentLang] = useState('');

    const handleEdit = (id, comment, language) => {
        setEditPopup(true); // Show the popup 
        setItemToEdit(id); // Set the item to edit
        setOldComment(comment);
        setEditComment(comment);
        setEditCommentLang(language);
    };
    const confirmEdit = async () => {
        console.log(`Attempting to edit comment with id: ${itemToEdit}`);
        
        const updatedComment = {
            username: loggedInUser,
            commentBody: editComment,
            accessFlag: "public",
            languageName: editCommentLang
        }
        
        try{
            await api.put(`http://localhost:8080/comment/${itemToEdit}`, updatedComment);
            console.log(`Item ${itemToEdit} edited successfully`);
            loadComments();
        } catch (error) {
            console.log(error.message);
        }
        // Hide the popup after edit and reset state
        setEditPopup(false);
        setItemToEdit(null);
        setOldComment('');
        setEditComment('');
        setEditCommentLang(''); 
        navigate("/");
    };
    //Cancel edit action
    const cancelEdit = () => {
        setEditPopup(false);
        setItemToEdit(null);
        setOldComment('');
        setEditComment('');
        setEditCommentLang(''); 
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
                                                backgroundColor: colorMap.get(language.id), 
                                                color: 'white',
                                                fontSize: '24px',
                                                fontWeight: 'bold',
                                                fontFamily: "Lobster", 
                                            }}
                                        >
                                            {language.name.charAt(0).toUpperCase()}
                                        </div>
                                    )}

                                    {/* Username and Follow Button */}
                                    <div className="position-absolute" style={{
                                        top: '20px',
                                        left: '80px',
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}>
                                        <div style={{
                                            fontSize: '15px'
                                        }}>
                                            {language.username}
                                        </div>
                                    </div>

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

                                    {/* Vowels */}
                                    {vowelData[language.id] && vowelData[language.id].length > 0 && (
                                        <div className="vowel-data-section mb-3">
                                            <h6>Vowels</h6>
                                            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '10px' }}>
                                                {vowelData[language.id].map((vowel, index) => (
                                                    <div
                                                        key={index}
                                                        style={{
                                                            border: '1px solid #000', 
                                                            borderRadius: '15px', // Rounded corners
                                                            padding: '8px 15px', // Padding inside the border
                                                            fontSize: '16px', 
                                                            textAlign: 'center', 
                                                            display: 'inline-block', 
                                                        }}
                                                    >
                                                        {vowel.name} 
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    
                                    
                                    {/* Consonants */}
                                    {consonantData[language.id] && consonantData[language.id].length > 0 && (
                                        <div className="consonant-data-section mb-3">
                                            <h6>Consonants</h6>
                                            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '10px' }}>
                                                {consonantData[language.id].map((consonant, index) => (
                                                    <div
                                                        key={index}
                                                        style={{
                                                            border: '1px solid #000', 
                                                            borderRadius: '15px', // Rounded corners
                                                            padding: '8px 15px', // Padding inside the border
                                                            fontSize: '16px', 
                                                            textAlign: 'center', 
                                                            display: 'inline-block', 
                                                        }}
                                                    >
                                                        {consonant.name} 
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Syllable Section */}
                                    {syllableData[language.id] && syllableData[language.id].length > 0 && (
                                    <div className="syllable-data-section mb-3">
                                        <h6>Syllable Structure</h6>    
                                        <div>
                                            {renderSyllableItems(syllableData[language.id][0].onsetLength, syllableData[language.id][0].onsetRequiredLength)} V{" "}
                                            {renderSyllableItems(syllableData[language.id][0].codaLength, syllableData[language.id][0].codaRequiredLength)}
                                        </div>
                                    </div>
                                    )}

                                    {/* Comment Section */}
                                    <div className="card-footer">
                                        <h6>Comments</h6>
                                        {/* Comment Entries */}
                                        <div className="comments-list">
                                            {comments
                                                .filter((comment) => comment.languageName === language.name) // Filter comments for the specific language
                                                .map((filteredComment, commentIndex) => (
                                                <div className="comment mb-2" key={commentIndex}>
                                                    <div className="d-flex justify-content-start align-items-center">
                                                        <strong className="me-2">{filteredComment.username}:</strong>
                                                        <span className="text-muted">{filteredComment.commentBody}</span>
                                                        {loggedInUser === filteredComment.username && (
                                                            <div className="ms-auto d-flex">
                                                                <button className="btn btn-sm btn-light me-2 btn-outline-secondary"
                                                                    onClick={() => handleEdit(filteredComment.id, filteredComment.commentBody, language.name)}>
                                                                    <FaPen/></button>
                                                                <button className="btn btn-sm btn-light btn-outline-danger"
                                                                    onClick={() => handleDelete(filteredComment.id)}
                                                                    >
                                                                    <FaTrash/></button>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Comment Input */}
                                        <div className="input-group mt-3">
                                            <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Add a comment..."
                                            onChange={(e) => onInputChange(e)}
                                            />
                                            <button className="btn btn-outline-secondary" type="submit" onClick={(e)=> onSubmit(e, language.name)}>Post</button>
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
            <div id="deletePopup" className=''>
                {/* Confirmation Popup */}
                {deletePopup && (
                    <div
                    className="modal show d-block"
                    tabIndex="-1"
                    style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                    >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-center w-100">Confirm Deletion</h5>
                            <button
                            type="button"
                            className="btn-close"
                            onClick={cancelDelete}
                            aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body text-center">
                            <p>Are you sure you want to delete this comment?</p>
                        </div>
                        <div className="modal-footer d-flex justify-content-center">
                            <button type="button" className="btn btn-danger mx-2" onClick={confirmDelete}>
                            Yes, Delete
                            </button>
                            <button type="button" className="btn btn-secondary mx-2" onClick={cancelDelete}>
                            Cancel
                            </button>
                        </div>
                        </div>
                    </div>
                    </div>
                )}
            </div>
            <div id="editPopup" className=''>
                {/* Confirmation Popup */}
                {editPopup && (
                    <div
                    className="modal show d-block"
                    tabIndex="-1"
                    style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                    >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-center w-100">Edit Comment</h5>
                            <button type="button" className="btn-close" onClick={cancelEdit} aria-label="Close" ></button>
                        </div>
                        <div className="modal-body">
                            <textarea
                            className="form-control"
                            rows="5"
                            value={editComment}
                            onChange={(e) => setEditComment(e.target.value)}
                            style={{ resize: 'vertical', width: '100%' }}/>
                        </div>
                        
                        <div className="modal-footer d-flex justify-content-center">
                            <button type="button" className="btn btn-success mx-2" onClick={confirmEdit}>
                            Save
                            </button>
                            <button type="button" className="btn btn-secondary mx-2" onClick={cancelEdit}>
                            Cancel
                            </button>
                        </div>
                        </div>
                    </div>
                    </div>
                )}
            </div>
        </div>
    )
}