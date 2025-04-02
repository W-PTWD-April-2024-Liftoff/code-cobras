import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useAuth } from '../security/AuthContext';
import api from '../api/languages';

export default function ViewLanguage() {
    const navigate = useNavigate();
    const { loggedInUser } = useAuth();

    const [language, setLanguage] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [color, setColor] = useState('');

    const languageId = new URLSearchParams(window.location.search).get("id");

    useEffect(() => {
        loadLanguage();
        loadComments();
    }, []);

    const loadLanguage = async () => {
        try {
            const response = await fetch(`http://localhost:8080/viewlanguage?id=${languageId}`);
            const data = await response.json();
            setLanguage(data);
            setColor(getRandomColor());
        } catch (err) {
            console.error("Failed to load language", err);
        }
    };

    const loadComments = async () => {
        try {
            const res = await fetch("http://localhost:8080/comments?accessFlag=public");
            const data = await res.json();
            setComments(data);
        } catch (err) {
            console.error("Failed to load comments", err);
        }
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();

        if (!language.name) {
            console.error("Language name is undefined. Cannot submit comment.");
            return;
        }

        const formData = new FormData();
        formData.append("username", loggedInUser);
        formData.append("commentBody", newComment);
        formData.append("accessFlag", "public");
        formData.append("languageName", language.name);

        try {
            await api.post("http://localhost:8080/addcomment", formData);
            loadComments();
            setNewComment('');
        } catch (error) {
            console.error("Error submitting comment", error);
        }
    };

    const getRandomColor = () => {
        const colorList = ["#FFDAB9", "#800000", "#FF1493", "#40E0D0", "#8A2BE2", "#F4A300", "#B22222"];
        return colorList[Math.floor(Math.random() * colorList.length)];
    };

    return (
        <div>
            <div className='d-flex justify-content-start m-4'>
                <Link className="btn btn-outline-secondary ms-0" onClick={() => navigate(-1)}>Back</Link>
            </div>

            <div className="m-5 p-2 shadow border-2 rounded">
                <div className="card position-relative">
                    {language.image ? (
                        <img src={`data:image/jpeg;base64,${language.image}`} alt="Profile" className="position-absolute rounded-circle" style={{ top: '10px', left: '10px', width: '50px', height: '50px' }} />
                    ) : (
                        <div className="position-absolute rounded-circle" style={{ top: '10px', left: '10px', width: '50px', height: '50px', backgroundColor: color, display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontSize: '24px', fontWeight: 'bold' }}>
                            {language.name ? language.name.charAt(0).toUpperCase() : '?'}
                        </div>
                    )}

                    <FaRegHeart className="position-absolute text-danger" style={{ top: '10px', right: '10px', fontSize: '24px' }} />

                    <div className="card-body pt-3">
                        <h5 className="card-title mb-3 text-dark">{language.name}</h5>
                        <p className="card-text">{language.description}</p>
                    </div>

                    <div className="card-footer">
                        <h6>Comments</h6>
                        <div className="comments-list">
                            {comments
                                .filter((comment) => comment.languageName === language.name)
                                .map((comment, idx) => (
                                    <div className="comment mb-2" key={idx}>
                                        <strong className="me-2">{comment.username}:</strong>
                                        <span className="text-muted">{comment.commentBody}</span>
                                    </div>
                                ))}
                        </div>

                        <form onSubmit={handleCommentSubmit} className="input-group mt-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Add a comment..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                            />
                            <button className="btn btn-outline-secondary" type="submit">Post</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
