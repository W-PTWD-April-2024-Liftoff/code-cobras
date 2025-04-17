import {useState,useEffect} from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../security/AuthContext';
import api from '../api/languages';

export default function ViewProfile() {

    const {loggedInUserId} = useAuth();
    const {logout} = useAuth();
    //const {id} = useParams();
    const id = loggedInUserId;

    //Allows for navigate and redirection after an event. 
    const navigate = useNavigate()

    //Users
    const [user, setUser] = useState([])

    // useEffect(()=>{
    //     loadUser();
    // })

    const loadUser = async () => {
        console.log(id);
        const result = await axios.get(`http://localhost:8080/viewprofile/${id}`);
        setUser(result.data);
    }

    const [showPopup, setShowPopup] = useState(false);
    //const [itemToDelete, setItemToDelete] = useState(null);

    const handleDelete = () => {
        setShowPopup(true); // Show the popup 
        //setItemToDelete(id); // Set the item to delete        
    };    

    const confirmDelete = async () => {
        console.log(id);
        console.log(`Attempting to delete Profile with id: ${id}`);
        try{
            await api.delete(`http://localhost:8080/viewprofile/${id}`);
            console.log(`Profile #${id} deleted`);

            //Add delete for vowels, consonants, comments, and syllables

            //loadLanguages();
        } catch (error) {
            console.log(error.message);
        }
        // Hide the popup after deletion
        setShowPopup(false);
        //setItemToDelete(null);
        logout();
        navigate("/login");
    };
    //Cancel delete action
    const cancelDelete = () => {
        setShowPopup(false);
        setItemToDelete(null);
    };    
    

    return (       
        <div className='container'>
            <div className=''>
                <h1>My Profile</h1>
                <p>This is where I can view my profile and my languages</p>
                <Link className="btn btn-outline-primary" to={`/editprofile/${loggedInUserId}`} style={{margin:5}}>Edit Profile</Link>
            </div>
            <div className="container p-4">
                <button className="btn btn-outline-danger mx-2" onClick={() =>  handleDelete()}>Delete Profile</button>
            </div>

            <br></br>
            <br></br>

            <div id="deletePopup" className=''>
                {/* Confirmation Popup */}
                {showPopup && (
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
                            <p>Are you sure you want to delete this user Profile?</p>
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

        </div>
    )
};