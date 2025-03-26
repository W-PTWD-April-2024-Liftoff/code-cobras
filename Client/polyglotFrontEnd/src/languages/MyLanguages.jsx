import {useState,useEffect} from 'react';
import api from '../api/languages';
import { Link, useNavigate } from 'react-router-dom';

export default function MyLanguages() {
    //Allows for navigate and redirection after an event. 
    let navigate = useNavigate();

    const [languages,setLanguages] = useState([]);
    const [error,setError] = useState([]);

    useEffect(()=>{
        loadLanguages();        
    }, []); 

    const loadLanguages = async () => {
        let username = "Foxfyyre"
        try {
            const response = await fetch(`http://localhost:8080/languages?username=${username}`);
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setLanguages(data); // Save the response data into state
          } catch (err) {
            setError(err.message);
          }
    }

    const [showPopup, setShowPopup] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    const handleDelete = (id) => {
        setShowPopup(true); // Show the popup 
        setItemToDelete(id); // Set the item to delete        
    };
    const confirmDelete = async () => {
        console.log(`Attempting to delete language with id: ${itemToDelete}`);
        try{
            await api.delete(`http://localhost:8080/deletelanguage/${itemToDelete}`);
            console.log(`Item ${itemToDelete} deleted`);
            loadLanguages();
        } catch (error) {
            console.log(error.message);
        }
        // Hide the popup after deletion
        setShowPopup(false);
        setItemToDelete(null);
        navigate("/languages");
    };
    //Cancel delete action
    const cancelDelete = () => {
        setShowPopup(false);
        setItemToDelete(null);
    };
    

    const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    };
    const popupStyle = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '5px',
    textAlign: 'center',
    };

    return (       
        <div className='container'>
            <div className='mt-5'>
                <h1>My Languages</h1>
            </div>
            <br></br>
            <br></br>
            <Link className="btn btn-outline-success mx-2" to={`/addlanguage`}>Create a new language!</Link>
            <br></br>
            <br></br>
            <div className='py-4'>
                <table className="table table-striped border shadow">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Language Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        { languages && languages.length > 0 ? (
                        languages.map((language, index) => (
                            
                            <tr scope="row" key={index}>
                                <th>{index+1}</th>
                                <td>{language.name}</td>
                                <td>{language.description}</td>
                                <td>
                                    <Link className="btn btn-success mx-2" to={`/viewlanguage?id=${language.id}`}>View</Link>
                                    <Link className="btn btn-secondary mx-2" to={`/editlanguage?id=${language.id}`}>Edit</Link>
                                    <button className="btn btn-outline-danger mx-2" onClick={() => handleDelete(language.id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No languages to display</td>
                        </tr>
                    )}                 
                        
                    </tbody>
                </table>      
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
                            <p>Are you sure you want to delete this item?</p>
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