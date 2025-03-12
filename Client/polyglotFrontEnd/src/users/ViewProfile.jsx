import {useState,useEffect} from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function ViewProfile() {

    const [languages,setLanguages] = useState([])

    const {id} = useParams();

    let navigate = useNavigate;

    useEffect(()=>{
        loadLanguages();
    },[]);

    const loadLanguages = async () => {
        const result = await axios.get("http://localhost:8080/viewlanguages");
        setLanguages(result.data);
    };

    const deleteLanguage = async (id) => {
        await axios.delete(`http://localhost:8080/viewlanguage/${language.id}`)
    }

    const [user, setUser] = useState([])

    useEffect(()=>{
        loadUser();
    })

    const loadUser = async () => {
        const result = await axios.get("http://localhost:8080/viewprofile");
        setUser(result.data);
    }

    const deleteUser = async (id) => {
        await axios.delete(`http://localhost:8080/viewprofile/${user.id}`)
        navigate("/");
    }
    

    return (
        
        
        <div className='container'>
            <div className=''>
                <h1>My Profile</h1>
                <p>This is where I can view my profile and my languages</p>
                <Link className="btn btn-outline-primary" to={`/editprofile/${user.id}`} style={{margin:5}}>Edit Profile</Link>
            </div>
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
                        {
                            languages.map((language,index)=> (
                                <tr>
                                    <th scope="row" key={index}>{index+1}</th>
                                    <td>{language.name}</td>
                                    <td>{language.description}</td>
                                    <td>
                                        <Link className="btn btn-outline-success mx-2" to={`/editlanguage/${language.id}`}>Edit</Link>
                                        <button className="btn btn-outline-danger mx-2" onClick={() => deleteLanguage(language.id)}>Delete</button>
                                        {/* Need to add a pop-up warning here stating "Are you sure? This language will be lost to the ether forever" */}
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <button className="btn btn-outline-danger mx-2" onClick={() => deleteUser(user.id)}>
                Delete Profile</button>
        </div>
    )
};