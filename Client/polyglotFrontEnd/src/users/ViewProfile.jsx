import {useState,useEffect} from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../security/AuthContext';

export default function ViewProfile() {

    const {loggedInUserId} = useAuth();
    //const {id} = useParams();
    const id = loggedInUserId;

    //Allows for navigate and redirection after an event. 
    let navigate = useNavigate;

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

    const deleteUser = async (id) => {
        await axios.delete(`http://localhost:8080/viewprofile/${id}`)
        //navigate("/"); replace with appropriate redirect
    }
    

    return (       
        <div className='container'>
            <div className=''>
                <h1>My Profile</h1>
                <p>This is where I can view my profile and my languages</p>
                <Link className="btn btn-outline-primary" to={`/editprofile/${loggedInUserId}`} style={{margin:5}}>Edit Profile</Link>
            </div>
            <div className="container p-4">
                <button className="btn btn-outline-danger mx-2" onClick={() => deleteUser(user.id)}>Delete Profile</button>
            </div>
        </div>
    )
};