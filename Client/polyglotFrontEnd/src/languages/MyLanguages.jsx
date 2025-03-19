import {useState,useEffect} from 'react';
import axios from 'axios';
import api from '../api/languages';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function MyLanguages() {

    const {id} = useParams();
    //const cors = require('cors');

    //Allows for navigate and redirection after an event. 
    let navigate = useNavigate;

    const [languages,setLanguages] = useState([]);

    useEffect(()=>{
        
        loadLanguages();
    },[]);

    const loadLanguages = async () => {
        try {
        const result = await api.get("/languages", id);
        setLanguages(result.data);
        } catch (error) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        }
    };

    // const deleteLanguage = async (id) => {
    //     await axios.delete(`http://localhost:8080/viewlanguage/${id}`)
    //     navigate("/languages");
    // }

    return (       
        <div className='container'>
            <div className=''>
                <h1>My Languages</h1>
            </div>
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
                
            </div>
            <p>Language buttons for now: access only.</p>
            <Link className="btn btn-outline-success mx-2" to={`/addlanguage`}>Add</Link>
            <Link className="btn btn-outline-success mx-2" to={`/editlanguage/`}>Edit</Link>
        </div>
    )
};


{/* <table>
    <thead>

    </thead>
    <tbody>
        <script>
        if (languages) {languages.map((language,index) => (
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
        } else {
            <p>No Languages to display.</p>
        }
            
        </script>
    </tbody>
</table> */}
