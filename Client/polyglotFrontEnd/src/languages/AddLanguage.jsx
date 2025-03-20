import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import api from '../api/languages';

export default function AddLanguage() {
    
    let navigate = useNavigate();

    const [errorMsg,setErrorMsg]=useState('');
    const [language,setLanguage]=useState({
        name:"",
        description:"",
        accessFlag:"",
        username:""
    });
    
    const [languageVowels,setLanguageVowels]=useState({
        i:"",
        y:""
    })

    const [languageConsonants,setLanguageConsonants]=useState({
        
    })

    const [languageSounds, setLanguageSounds]=useState({

    })

    const {name, description, accessFlag, username}=language;
    const {i, y}=languageVowels

    const onInputChange=(e)=>{
        setLanguage({...language,[e.target.name]:e.target.value});
        console.log(language);
    }

    const onRadioChange=(e)=>{
        setLanguage({...language,[e.target.name]:e.target.id});
        console.log(language);
    }

    const onSoundSelect=(e)=>{
        e.preventDefault();
        if (e.target.id === "vowel") {
            setLanguageVowels({...languageVowels,[e.target.name]:e.target.id});
        } else if (e.target.id === "consonant") {
            setLanguageConsonants({...languageConsonants,[e.target.name]:e.target.id})
        }
    }

    const onSubmit= async(e)=>{
        e.preventDefault();
        try {
            const response = await api.post("http://localhost:8080/addlanguage", language);
            console.log(response.data);
            console.log(response.response) 
            navigate("/languages");
        } catch(error) {
            console.log(`Error: ${error.message}`);
        }
    }
    
    return (
        <div className='row shadow'>
            <h1>Add New Language</h1>
            <form onSubmit={(e)=> onSubmit(e)}>
                <div className="row w-50 position-relative start-50 translate-middle-x">
                    <div className="text-center mt-5">
                        <label htmlFor="Name" className="form-label">Language name</label>
                        <input type={"text"} 
                        className="form-control shadow" 
                        placeholder="Enter your language name" 
                        name="name" 
                        value={name}
                        onChange={(e)=>onInputChange(e)}
                        required 
                        autoFocus="true"></input>
                    </div>
                </div>
                <div className="row w-50 position-relative start-50 translate-middle-x">
                    <div className="text-center mt-3">
                        <label htmlFor="Name" className="form-label">Username</label>
                        <input type={"text"} 
                        className="form-control shadow" 
                        placeholder="Enter your username" 
                        name="username" 
                        value={username}
                        onChange={(e)=>onInputChange(e)}
                        required></input>
                    </div>
                </div>
                <div className="row w-75 position-relative start-50 translate-middle-x">
                    <div className="text-center mt-3">
                        <label htmlFor="Description" className="form-label">Language Description</label>
                        <textarea type={"text"} 
                        rows="4"
                        className="form-control shadow" 
                        placeholder="Enter a description of your language" 
                        name="description" 
                        value={description}
                        onChange={(e)=>onInputChange(e)}
                        required></textarea>
                    </div>
                </div>
                <br></br>
                <p>Choose whether your language can be seen by others:</p>
                <div className="row" id="accessFlag" required>
                    <div className="form-check">
                        <label className="form-check-label" htmlFor="flexCheckChecked">Public Language
                            <input className="form-check-input" 
                            type="radio" 
                            name="accessFlag" 
                            onChange={(e)=>onRadioChange(e)} 
                            defaultChecked={accessFlag}
                            id="public"/>
                        </label>
                        
                    </div>
                    <div className="form-check">
                        <label className="form-check-label" htmlFor="flexCheckDefault">Private Language
                            <input className="form-check-input" 
                            type="radio" 
                            name="accessFlag" 
                            onChange={(e)=>onRadioChange(e)} 
                            defaultChecked={accessFlag}
                            id="private"/>
                        </label>
                    </div>
                </div>
                <br></br>
                <div className="row">
                    <h4>Vowel selection</h4>
                    <table className="table table-striped border shadow border">
                        <thead>
                            <tr>
                                <td className=""></td>
                                <th colSpan="3" scope="col">Front</th>
                                <th colSpan="3" scope="col">Near-Front</th>
                                <th colSpan="3" scope="col">Central</th>
                                <th colSpan="3" scope="col">Near-Back</th>
                                <th colSpan="3" scope="col">Back</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>Close</th>
                                {/* <td>
                                <input className="form-check-input" 
                                        type="checkbox" 
                                        name="i" 
                                        defaultChecked={i}
                                        id="vowel"/>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">i 
                                    </label>
                                    </td> */}
                                <td>i</td>
                                <td></td>
                                {/* <td><label className="btn btn-outline-primary" htmlFor="btn-check-outlined">y
                                    <input type="checkbox" 
                                        className="btn-check"
                                        name='y'
                                        defaultChecked={y} 
                                        id="btn-check-primary"
                                        autoComplete="off">
                                        </input></label></td> */}
                                        <td>y</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>ɨ</td>
                                <td></td>
                                <td>ʉ</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>ɯ</td>
                                <td></td>
                                <td>u</td>
                            </tr>
                            <tr>
                                <th>Near-Close</th>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>ɪ</td>
                                <td>ʏ</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>ʊ</td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <th>Close-Mid</th>
                                <td></td>
                                <td></td>
                                <td>e</td>
                                <td></td>
                                <td>ø</td>
                                <td></td>
                                <td></td>
                                <td>ɘ</td>
                                <td></td>
                                <td>ɵ</td>
                                <td></td>
                                <td></td>
                                <td>ɤ</td>
                                <td></td>
                                <td>o</td>
                            </tr>
                            <tr>
                                <th>Mid</th>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>ə</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <th>Open-Mid</th>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>ɛ</td>
                                <td></td>
                                <td>œ</td>
                                <td></td>
                                <td>ɜ</td>
                                <td></td>
                                <td>ɞ</td>
                                <td></td>
                                <td></td>
                                <td>ʌ</td>
                                <td></td>
                                <td>ɔ</td>
                            </tr>
                            <tr>
                                <th>Near-Open</th>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>æ</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>ɐ</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <th>Open</th>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>a</td>
                                <td></td>
                                <td></td>
                                <td>ä</td>
                                <td></td>
                                <td></td>
                                <td>ɑ</td>
                                <td></td>
                                <td>ɒ</td>
                            </tr>
                        </tbody>
                        
                    </table>

                </div>
                <div className="row">
                    <h4>Consonant Selection</h4>
                    <table className="table table-striped border shadow border">
                        <thead>
                            <tr>
                                <td></td>
                                <th colSpan="2" scope="col">Bi-Labial</th>
                                <th colSpan="2" scope="col">Labio-Dental</th>
                                <th colSpan="2" scope="col">Dental</th>
                                <th colSpan="2" scope="col">Alveolar</th>
                                <th colSpan="2" scope="col">Post-Alveolar</th>
                                <th colSpan="2" scope="col">Retroflex</th>
                                <th colSpan="2" scope="col">Palatal</th>
                                <th colSpan="2" scope="col">Velar</th>
                                <th colSpan="2" scope="col">Uvular</th>
                                <th colSpan="2" scope="col">Pharyngeal</th>
                                <th colSpan="2" scope="col">Glottal</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>Plosive</th>
                                <td>p</td>
                                <td>b</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>t</td>
                                <td>d</td>
                                <td></td>
                                <td></td>
                                <td>ʈ</td>
                                <td>ɖ</td>
                                <td>c</td>
                                <td>ɟ</td>
                                <td>k</td>
                                <td>g</td>
                                <td>q</td>
                                <td>ɢ</td>
                                <td></td>
                                <td></td>
                                <td>ʔ</td>
                                <td></td>
                            </tr>
                            <tr>
                                <th>Nasal</th>
                                <td></td>
                                <td>m</td>
                                <td></td>
                                <td>ɱ</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>n</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>ɳ</td>
                                <td></td>
                                <td>ɲ</td>
                                <td></td>
                                <td>ŋ</td>
                                <td></td>
                                <td>ɴ</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <th>Trill</th>
                                <td></td>
                                <td>ʙ</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>r</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>ʀ</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <th>Tap/Flap</th>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>ɾ</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>ɽ</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <th>Fricative</th>
                                <td>ɸ</td>
                                <td>β</td>
                                <td>f</td>
                                <td>v</td>
                                <td>θ</td>
                                <td>ð</td>
                                <td>s</td>
                                <td>z</td>
                                <td>ʃ</td>
                                <td>ʒ</td>
                                <td>ʂ</td>
                                <td>ʐ</td>
                                <td>ç</td>
                                <td>ʝ</td>
                                <td>x</td>
                                <td>ɣ</td>
                                <td>χ</td>
                                <td>ʁ</td>
                                <td>ħ</td>
                                <td>ʕ</td>
                                <td>h</td>
                                <td>ɦ</td>
                            </tr>
                            <tr>
                                <th>Lateral Fricative</th>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>ɬ</td>
                                <td>ɮ</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <th>Approximant</th>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>ʋ</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>ɹ</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>ɻ</td>
                                <td></td>
                                <td>j</td>
                                <td></td>
                                <td>ɰ</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <th>Lateral Approximant</th>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>l</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>ɭ</td>
                                <td></td>
                                <td>ʎ</td>
                                <td></td>
                                <td>ʟ</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>

                        </tbody>
                    </table>
                </div>
                <button type="submit" className="btn btn-outline-primary m-4 shadow">Submit</button>
                <Link className="btn btn-outline-danger m-4 shadow" to="/languages">Cancel</Link>


            </form>
        </div>
    )
}