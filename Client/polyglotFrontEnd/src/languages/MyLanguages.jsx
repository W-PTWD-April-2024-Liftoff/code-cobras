import {useState,useEffect} from 'react';
import axios from 'axios';
import api from '../api/languages';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function MyLanguages() {

    const {id} = useParams();

    //Allows for navigate and redirection after an event. 
    let navigate = useNavigate;

    const [languages,setLanguages] = useState([]);

    useEffect(()=>{
        loadLanguages();
        console.log(typeof languages); //testing
        console.log(languages[0]); //testing
        
        
        
    }, []);

    const loadLanguages = async () => {
        let username = "Foxfyyre"
        try{
            const result = await api.get(`/languages`, {
                params: "Foxfyyre" //replace with user objects username parameter                
            })
            if (result && result.data) {setLanguages(result.data);
                console.log(typeof languages); //testing
                console.log(languages[0]);
            }
        } catch(error) {
            console.log(error.message);
        }  
    }

    const deleteLanguage = async (id) => {
        try{
            //add popup to confirm deletion
            await api.delete(`http://localhost:8080/viewlanguage/${id}`);
        } catch (error) {
            console.log(error.message);
        }
        navigate("/languages");
    }

    return (       
        <div className='container'>
            <div className=''>
                <h1>My Languages</h1>
            </div>
            <br></br>
            <br></br>
            <Link className="btn btn-outline-success mx-2" to={`/addlanguage`}>Add a new language!</Link>
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
                        <tr>
                            <th scope="row">1</th>
                            <td>Saranir</td>
                            <td>My first constructed language</td>
                            <td>
                                <Link className="btn btn-success mx-2" to={`/viewlanguage/1`}>View</Link>
                                <Link className="btn btn-outline-primary mx-2" to={`/editlanguage/1`}>Edit</Link>
                                <button className="btn btn-outline-danger mx-2" onClick={() => deleteLanguage(1)}>Delete</button>
                            </td>
                        </tr>        
                                
                            
                    </tbody>
                        
                </table>
                <table>
                    <thead>

                    </thead>
                    <tbody>
                        <script>
                        { languages && languages.map((language,index) => (
                            <tr>
                                <th scope="row" key={index}>{index+1}</th>
                                <td>{language.name}</td>
                                <td>{language.description}</td>
                                <td>
                                    <Link className="btn btn-success mx-2" to={`/viewlanguage/${language.id}`}>View</Link>
                                    <Link className="btn btn-outline-success mx-2" to={`/editlanguage/${language.id}`}>Edit</Link>
                                    <button className="btn btn-outline-danger mx-2" onClick={() => deleteLanguage(language.id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                        } 
                                                 
                        </script>
                    </tbody>
                </table>      
            </div>
            
            
            <br></br>
            <br></br>
            <p>Edit button for temporary access only.</p>
            <Link className="btn btn-outline-success mx-2" to={`/editlanguage/`}>Edit</Link>
        </div>
    )
};