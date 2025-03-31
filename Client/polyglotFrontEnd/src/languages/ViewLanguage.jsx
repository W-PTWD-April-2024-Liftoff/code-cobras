import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaPen, FaTrash } from 'react-icons/fa';
import { useAuth } from '../security/AuthContext';
import api from '../api/languages';

export default function ViewLanguage() {
    let navigate = useNavigate();

    const [language,setLanguage] = useState({});
    const [color, setColor] = useState('');
    const [error,setError] = useState([]);
    const [comments, setComments] = useState([]);
    const [privateComment, setPrivateComment] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [vowelData, setVowelData] = useState([]);
    const [consonantData, setConsonantData] = useState([]);
    const {loggedInUser} = useAuth();

    useEffect(()=>{
        const queryParams = window.location.search;
        const url = `http://localhost:8080/viewlanguage${queryParams}`;
        loadLanguages(url);        
    }, []);

    useEffect(()=>{
        loadComments();        
    }, []); 

    useEffect(()=>{
        const queryParams = window.location.search;
        const url = `http://localhost:8080/language/vowels/${queryParams}`;
        loadVowels(url);        
    }, []);

    const loadLanguages = async (url) => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response unsuccessful');
            }
            const data = await response.json();
            setLanguage(data); // Save the response data into state
            console.log(data);

            
            setColor(getRandomColor());
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
        const response1 = await fetch(`http://localhost:8080/comments?accessFlag=public`);
        if (!response1.ok) {
            throw new Error('Network response was not ok');
        }
        const data1 = await response1.json();
        setComments(data1);
        console.log(data1);

        const response2 = await fetch(`http://localhost:8080/comments?accessFlag=private`);
        if (!response1.ok) {
            throw new Error('Network response was not ok');
        }
        const data2 = await response2.json();
        setPrivateComment(data2);
        console.log(data2);

        } catch (err) {
            setError(err.message);
        }
    } 

    const loadVowels = async (url) => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setVowelData(data); 
            console.log('Vowel Data:', data);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleBackButton = () => {
        navigate(-1);
    }

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
    };
    //Cancel delete action
    const cancelDelete = () => {
        setDeletePopup(false);
        setItemToDelete(null);
    };
    //Edit Comment
    const [editPopup, setEditPopup] = useState(false);
    const [itemToEdit, setItemToEdit] = useState(null);
    const [editComment, setEditComment] = useState('');
    const [editAccessFlag, setEditAccessFlag] = useState('');
    const [editCommentLang, setEditCommentLang] = useState('');

    const handleEdit = (id, comment, accessFlag, language) => {
        setEditPopup(true); // Show the popup 
        setItemToEdit(id); // Set the item to edit
        setEditComment(comment);
        setEditAccessFlag(accessFlag);
        setEditCommentLang(language);
    };
    const confirmEdit = async () => {
        console.log(`Attempting to edit comment with id: ${itemToEdit}`);
        
        const updatedComment = {
            username: loggedInUser,
            commentBody: editComment,
            accessFlag: editAccessFlag,
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
        setEditComment('');
        setEditAccessFlag('');
        setEditCommentLang(''); 
    };
    //Cancel edit action
    const cancelEdit = () => {
        setEditPopup(false);
        setItemToEdit(null);
        setEditComment('');
        setEditAccessFlag('');
        setEditCommentLang(''); 
    };

    
    return (
        <div>
            <div className='d-flex justify-content-start m-4'>
                <Link className="btn btn-outline-secondary ms-0" onClick={handleBackButton}>Back</Link>     
            </div>
                
            <div className="m-5 p-2 shadow border-2 rounded" >
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
                                    backgroundColor: color, 
                                    color: 'white',
                                    fontSize: '24px',
                                    fontWeight: 'bold',
                                    fontFamily: "Lobster", 
                                }}
                            >
                                {language.name ? language.name.charAt(0).toUpperCase() : "?"}
                            </div>
                        )}

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

                        {/* Vowels */}
                        {vowelData.length > 0 && (
                            <div className="vowel-data-section">
                                <h6>Vowels for this Language:</h6>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                    {vowelData.map((vowel, index) => (
                                        <div
                                            key={index}
                                            style={{
                                                border: '2px solid #000', // Black border around each vowel
                                                borderRadius: '15px', // Rounded corners
                                                padding: '8px 15px', // Padding for spacing inside the border
                                                fontSize: '16px', // Adjust font size as needed
                                                backgroundColor: '#f5f5f5', // Light background color
                                                textAlign: 'center', // Center the text inside each box
                                                fontWeight: 'bold', // Make the text bold
                                                display: 'inline-block', // Ensure it stays inline
                                            }}
                                        >
                                            {vowel.name} {/* Assuming vowelName is the name of the vowel */}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Comment Section */}
                        <div className="card-footer">
                            <div>
                                {loggedInUser === language.username && privateComment.length > 0 && (
                                <div className="comments-list">
                                    <h6>Private Comments</h6>
                                    <div className="comment mb-2">
                                        <div className="d-flex justify-content-start align-items-center">
                                            <span className="text-muted">{privateComment[0].commentBody}</span>
                                                <div className="ms-auto d-flex">
                                                    <button className="btn btn-sm btn-light me-2 btn-outline-secondary"
                                                        onClick={() => handleEdit(privateComment[0].id, privateComment[0].commentBody, privateComment[0].accessFlag, language.name)}>
                                                        <FaPen/></button>
                                                    <button className="btn btn-sm btn-light btn-outline-danger"
                                                        onClick={() => handleEdit(privateComment[0].id, "No comments to display.", privateComment[0].accessFlag, language.name)}>
                                                        <FaTrash/></button>
                                                </div>
                                            
                                        </div>
                                    </div>
                                </div>
                                )}
                            </div>
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
                                                        onClick={() => handleEdit(filteredComment.id, filteredComment.commentBody, filteredComment.accessFlag, language.name)}>
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