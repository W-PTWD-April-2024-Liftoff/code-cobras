import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/languages';
import { useAuth } from '../security/AuthContext';



export default function AddLanguage() {
    
    let navigate = useNavigate();
    const {loggedInUser} = useAuth();
    

    const [errorMsg,setErrorMsg]=useState('');
    const [language,setLanguage]=useState({
        name:"",
        description:"",
        accessFlag:"",
        username:""
    });
    const [image, setImage] = useState(null);
    
    const [languageVowels,setLanguageVowels]=useState({
        i:"",
        y:"",
        ɪ:"",
        ʏ:"",
        e:"",
        ø:"",
        ɛ:"",
        œ:"",
        æ:"",
        a:'',
        ɨ:"",
        ʉ:'',
        ɘ:"",
        ɵ:"",
        ə:"",
        ɜ:"",
        ɞ:"",
        ɐ:"",
        ä:"",
        ɯ:"",
        u:"",
        ʊ:"",
        ɤ:"",
        o:"",
        ʌ:"",
        ɔ:"",
        ɑ:"",
        ɒ:""
    })

    const [languageConsonants, setLanguageConsonants] = useState({
        p: "",
        b: "",
        m: "",
        ɸ: "",
        β: "",
        f: "",
        v: "",
        θ: "",
        ð: "",
        t: "",
        d: "",
        n: "",
        s: "",
        z: "",
        ʃ: "",
        ʒ: "",
        ʂ: "",
        ʐ: "",
        ʈ: "",
        ɖ: "",
        ɳ: "",
        ɲ: "",
        ŋ: "",
        ɴ: "",
        ʈ̠: "",
        ʁ: "",
        ʔ: "",
        ɾ: "",
        ɽ: "",
        ʙ: "",
        r: "",
        ʀ: "",
        l: "",
        ɹ: "",
        j: "",
        w: "",
        h: "",
        ɦ: "",
        ʕ: "",
        ʧ: "",
        ʤ: "",
        tʃ: "",
        dʒ: "",
        ʍ: "",
        ɫ: "",
        ʎ: "",
        c: "",
        ɟ: "",
        k: "",
        g: "",
        q: "",
        ɢ: "",
        ɱ: "",
        ç: "",
        ʝ: "",
        x: "",
        ɣ: "",
        χ: "",
        ħ: "",
        ɬ: "",
        ɮ: "",
        ʋ: ""
    });

    const [languageSounds, setLanguageSounds]=useState({});

    const {name, description, accessFlag, username}=language;
    const {i, y, ɪ, ʏ, e, ø, ɛ, œ, æ, a, ɨ, ʉ, ɘ, ɵ, ə, ɜ, ɞ, ɐ, ä, ɯ, u, ʊ, ɤ, o, ʌ, ɔ, ɑ, ɒ}=languageVowels;
    const {p, b, m, ɸ, β, f, v, θ, ð, t, d, n, s, z, ʃ, ʒ, ʂ, ʐ, ʈ, ɖ, ɳ, ɲ, ŋ, ɴ, ʈ̠, ʁ, ʔ, ɾ, ɽ, ʙ, r, ʀ, l, ɹ, j, w, h, ɦ, ʕ, ʧ, ʤ, tʃ, dʒ, ʍ, ɫ, ʎ, c, ɟ, k, g, q, ɢ, ɱ, ç, ʝ, x, ɣ, χ, ħ, ɬ, ɮ, ʋ} = languageConsonants;
    

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

    const onImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        }
    }

    // const onSubmit= async(e)=>{
    //     e.preventDefault();
    //     try {
    //         const response = await api.post("http://localhost:8080/addlanguage", language);
    //         console.log(response.data);
    //         navigate("/languages");
    //     } catch(error) {
    //         console.log(`Error: ${error.message}`);
    //     }
    // }
    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', language.name);
        formData.append('description', language.description);
        formData.append('accessFlag', language.accessFlag);
        formData.append('username', language.username);
        if (image) {
            formData.append('image', image); 
        }

        try {
            const response = await api.post("http://localhost:8080/addlanguage", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', 
                }
            });
            console.log(response.data);
            navigate("/languages");
        } catch (error) {
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
                <div className="row w-75 position-relative start-50 translate-middle-x">
                    <div className="text-center mt-3">
                        <label htmlFor="Image" className="form-label">Upload an Image (optional)</label>
                        <input type="file"
                            className="form-control shadow"
                            name="image"
                            onChange={(e) => onImageChange(e)} />
                    </div>
                </div>
                <div className="row w-50 position-relative start-50 translate-middle-x">
                    <div className="text-center mt-3">
                        <label htmlFor="Name" className="form-label">Username</label>
                        <input type={"text"} 
                        className="form-control shadow" 
                        placeholder="Enter your username" 
                        name="username" 
                        value={loggedInUser}
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
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">i</label> 
                                    <input className="form-check-input" 
                                        type="checkbox" 
                                        name="i" 
                                        defaultChecked={i}
                                        id="vowel"/></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">y</label> 
                                    <input className="form-check-input" 
                                        type="checkbox" 
                                        name="y" 
                                        defaultChecked={y}
                                        id="vowel"/></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɨ</label> 
                                    <input className="form-check-input" 
                                        type="checkbox" 
                                        name="ɨ" 
                                        defaultChecked={ɨ}
                                        id="vowel"/></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ʉ</label> 
                                    <input className="form-check-input" 
                                        type="checkbox" 
                                        name="ʉ" 
                                        defaultChecked={ʉ}
                                        id="vowel"/></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɯ</label> 
                                    <input className="form-check-input" 
                                        type="checkbox" 
                                        name="ɯ" 
                                        defaultChecked={ɯ}
                                        id="vowel"/></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">u</label> 
                                    <input className="form-check-input" 
                                        type="checkbox" 
                                        name="u" 
                                        defaultChecked={u}
                                        id="vowel"/></td>
                            </tr>
                            <tr>
                                <th>Near-Close</th>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɪ</label> 
                                    <input className="form-check-input" 
                                        type="checkbox" 
                                        name="ɪ" 
                                        defaultChecked={ɪ}
                                        id="vowel"/></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ʏ</label> 
                                    <input className="form-check-input" 
                                        type="checkbox" 
                                        name="ʏ" 
                                        defaultChecked={ʏ}
                                        id="vowel"/></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ʊ</label> 
                                    <input className="form-check-input" 
                                        type="checkbox" 
                                        name="ʊ" 
                                        defaultChecked={ʊ}
                                        id="vowel"/></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <th>Close-Mid</th>
                                <td></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">e</label> 
                                    <input className="form-check-input" 
                                        type="checkbox" 
                                        name="e" 
                                        defaultChecked={e}
                                        id="vowel"/></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ø</label> 
                                    <input className="form-check-input" 
                                        type="checkbox" 
                                        name="ø" 
                                        defaultChecked={ø}
                                        id="vowel"/></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɘ</label> 
                                    <input className="form-check-input" 
                                        type="checkbox" 
                                        name="ɘ" 
                                        defaultChecked={ɘ}
                                        id="vowel"/></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɵ</label> 
                                    <input className="form-check-input" 
                                        type="checkbox" 
                                        name="ɵ" 
                                        defaultChecked={ɵ}
                                        id="vowel"/></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɤ</label> 
                                    <input className="form-check-input" 
                                        type="checkbox" 
                                        name="ɤ" 
                                        defaultChecked={ɤ}
                                        id="vowel"/></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">o</label> 
                                    <input className="form-check-input" 
                                        type="checkbox" 
                                        name="o" 
                                        defaultChecked={o}
                                        id="vowel"/></td>
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
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ə</label> 
                                    <input className="form-check-input" 
                                        type="checkbox" 
                                        name="ə" 
                                        defaultChecked={ə}
                                        id="vowel"/></td>
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
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɛ</label> 
                                    <input className="form-check-input" 
                                        type="checkbox" 
                                        name="ɛ" 
                                        defaultChecked={ɛ}
                                        id="vowel"/></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">œ</label> 
                                    <input className="form-check-input" 
                                        type="checkbox" 
                                        name="œ" 
                                        defaultChecked={œ}
                                        id="vowel"/></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɜ</label> 
                                    <input className="form-check-input" 
                                        type="checkbox" 
                                        name="ɜ" 
                                        defaultChecked={ɜ}
                                        id="vowel"/></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɞ</label> 
                                    <input className="form-check-input" 
                                        type="checkbox" 
                                        name="ɞ" 
                                        defaultChecked={ɞ}
                                        id="vowel"/></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ʌ</label> 
                                    <input className="form-check-input" 
                                        type="checkbox" 
                                        name="ʌ" 
                                        defaultChecked={ʌ}
                                        id="vowel"/></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɔ</label> 
                                    <input className="form-check-input" 
                                        type="checkbox" 
                                        name="ɔ" 
                                        defaultChecked={ɔ}
                                        id="vowel"/></td>
                            </tr>
                            <tr>
                                <th>Near-Open</th>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">æ</label> 
                                    <input className="form-check-input" 
                                        type="checkbox" 
                                        name="æ" 
                                        defaultChecked={æ}
                                        id="vowel"/></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɐ</label> 
                                    <input className="form-check-input" 
                                        type="checkbox" 
                                        name="ɐ" 
                                        defaultChecked={ɐ}
                                        id="vowel"/></td>
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
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">a</label> 
                                    <input className="form-check-input" 
                                        type="checkbox" 
                                        name="a" 
                                        defaultChecked={a}
                                        id="vowel"/></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ä</label> 
                                    <input className="form-check-input" 
                                        type="checkbox" 
                                        name="ä" 
                                        defaultChecked={ä}
                                        id="vowel"/></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɑ</label> 
                                    <input className="form-check-input" 
                                        type="checkbox" 
                                        name="ɑ" 
                                        defaultChecked={ɑ}
                                        id="vowel"/></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɒ</label> 
                                    <input className="form-check-input" 
                                        type="checkbox" 
                                        name="ɒ" 
                                        defaultChecked={ɒ}
                                        id="vowel"/></td>
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
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">p</label>
                                    <input className="form-check-input" type="checkbox" name="p" defaultChecked={p} id="consonant"/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">b</label>
                                    <input className="form-check-input" type="checkbox" name="b" defaultChecked={b} id="consonant"/>
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">t</label>
                                    <input className="form-check-input" type="checkbox" name="t" defaultChecked={t} id="consonant"/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">d</label>
                                    <input className="form-check-input" type="checkbox" name="d" defaultChecked={d} id="consonant"/>
                                </td>
                                <td></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ʈ</label>
                                    <input className="form-check-input" type="checkbox" name="ʈ" defaultChecked={ʈ} id="consonant"/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɖ</label>
                                    <input className="form-check-input" type="checkbox" name="ɖ" defaultChecked={ɖ} id="consonant"/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">c</label>
                                    <input className="form-check-input" type="checkbox" name="c" defaultChecked={c} id="consonant"/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɟ</label>
                                    <input className="form-check-input" type="checkbox" name="ɟ" defaultChecked={ɟ} id="consonant"/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">k</label>
                                    <input className="form-check-input" type="checkbox" name="k" defaultChecked={k} id="consonant"/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">g</label>
                                    <input className="form-check-input" type="checkbox" name="g" defaultChecked={g} id="consonant"/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">q</label>
                                    <input className="form-check-input" type="checkbox" name="q" defaultChecked={q} id="consonant"/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɢ</label>
                                    <input className="form-check-input" type="checkbox" name="ɢ" defaultChecked={ɢ} id="consonant"/>
                                </td>
                                <td></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ʔ</label>
                                    <input className="form-check-input" type="checkbox" name="ʔ" defaultChecked={ʔ} id="consonant"/>
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <th>Nasal</th>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">m</label>
                                    <input className="form-check-input" type="checkbox" name="m" defaultChecked={m} id="consonant"/>
                                </td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɱ</label>
                                    <input className="form-check-input" type="checkbox" name="ɱ" defaultChecked={ɱ} id="consonant"/>
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">n</label>
                                    <input className="form-check-input" type="checkbox" name="n" defaultChecked={n} id="consonant"/>
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɳ</label>
                                    <input className="form-check-input" type="checkbox" name="ɳ" defaultChecked={ɳ} id="consonant"/>
                                </td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɲ</label>
                                    <input className="form-check-input" type="checkbox" name="ɲ" defaultChecked={ɲ} id="consonant"/>
                                </td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ŋ</label>
                                    <input className="form-check-input" type="checkbox" name="ŋ" defaultChecked={ŋ} id="consonant"/>
                                </td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɴ</label>
                                    <input className="form-check-input" type="checkbox" name="ɴ" defaultChecked={ɴ} id="consonant"/>
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <th>Trill</th>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ʙ</label>
                                    <input className="form-check-input" type="checkbox" name="ʙ" defaultChecked={ʙ} id="consonant"/>
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">r</label>
                                    <input className="form-check-input" type="checkbox" name="r" defaultChecked={r} id="consonant"/>
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ʀ</label>
                                    <input className="form-check-input" type="checkbox" name="ʀ" defaultChecked={ʀ} id="consonant"/>
                                </td>
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
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɾ</label>
                                    <input className="form-check-input" type="checkbox" name="ɾ" defaultChecked={ɾ} id="consonant"/>
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɽ</label>
                                    <input className="form-check-input" type="checkbox" name="ɽ" defaultChecked={ɽ} id="consonant"/>
                                </td>
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
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɸ</label>
                                    <input className="form-check-input" type="checkbox" name="ɸ" defaultChecked={ɸ} id="consonant"/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">β</label>
                                    <input className="form-check-input" type="checkbox" name="β" defaultChecked={β} id="consonant"/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">f</label>
                                    <input className="form-check-input" type="checkbox" name="f" defaultChecked={f} id="consonant"/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">v</label>
                                    <input className="form-check-input" type="checkbox" name="v" defaultChecked={v} id="consonant"/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">θ</label>
                                    <input className="form-check-input" type="checkbox" name="θ" defaultChecked={θ} id="consonant"/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ð</label>
                                    <input className="form-check-input" type="checkbox" name="ð" defaultChecked={ð} id="consonant"/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">s</label>
                                    <input className="form-check-input" type="checkbox" name="s" defaultChecked={s} id="consonant"/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">z</label>
                                    <input className="form-check-input" type="checkbox" name="z" defaultChecked={z} id="consonant"/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ʃ</label>
                                    <input className="form-check-input" type="checkbox" name="ʃ" defaultChecked={ʃ} id="consonant"/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ʒ</label>
                                    <input className="form-check-input" type="checkbox" name="ʒ" defaultChecked={ʒ} id="consonant"/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ʂ</label>
                                    <input className="form-check-input" type="checkbox" name="ʂ" defaultChecked={ʂ} id="consonant"/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ʐ</label>
                                    <input className="form-check-input" type="checkbox" name="ʐ" defaultChecked={ʐ} id="consonant"/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ç</label>
                                    <input className="form-check-input" type="checkbox" name="ç" defaultChecked={ç} id="consonant"/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ʝ</label>
                                    <input className="form-check-input" type="checkbox" name="ʝ" defaultChecked={ʝ} id="consonant"/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">x</label>
                                    <input className="form-check-input" type="checkbox" name="x" defaultChecked={x} id="consonant"/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɣ</label>
                                    <input className="form-check-input" type="checkbox" name="ɣ" defaultChecked={ɣ} id="consonant"/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">χ</label>
                                    <input className="form-check-input" type="checkbox" name="χ" defaultChecked={χ} id="consonant"/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ʁ</label>
                                    <input className="form-check-input" type="checkbox" name="ʁ" defaultChecked={ʁ} id="consonant"/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ħ</label>
                                    <input className="form-check-input" type="checkbox" name="ħ" defaultChecked={ħ} id="consonant"/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ʕ</label>
                                    <input className="form-check-input" type="checkbox" name="ʕ" defaultChecked={ʕ} id="consonant"/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">h</label>
                                    <input className="form-check-input" type="checkbox" name="h" defaultChecked={h} id="consonant"/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɦ</label>
                                    <input className="form-check-input" type="checkbox" name="ɦ" defaultChecked={ɦ} id="consonant"/>
                                </td>
                            </tr>
                            <tr>
                                <th>Lateral Fricative</th>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɬ</label>
                                    <input className="form-check-input" type="checkbox" name="ɬ" defaultChecked={ɬ} id="consonant"/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɮ</label>
                                    <input className="form-check-input" type="checkbox" name="ɮ" defaultChecked={ɮ} id="consonant"/>
                                </td>
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
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ʋ</label>
                                    <input className="form-check-input" type="checkbox" name="ʋ" defaultChecked={ʋ} id="consonant"/>
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɹ</label>
                                    <input className="form-check-input" type="checkbox" name="ɹ" defaultChecked={ɹ} id="consonant"/>
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">j</label>
                                    <input className="form-check-input" type="checkbox" name="j" defaultChecked={j} id="consonant"/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">w</label>
                                    <input className="form-check-input" type="checkbox" name="w" defaultChecked={w} id="consonant"/>
                                </td>
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
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">l</label>
                                    <input className="form-check-input" type="checkbox" name="l" defaultChecked={l} id="consonant"/>
                                </td>
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
                        </tbody>
                    </table>

                </div>
                <button type="submit" className="btn btn-outline-primary m-4 shadow">Submit</button>
                <Link className="btn btn-outline-danger m-4 shadow" to="/languages">Cancel</Link>


            </form>
        </div>
    )
}