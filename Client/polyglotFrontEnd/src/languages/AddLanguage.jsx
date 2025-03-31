import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/languages';
import { useAuth } from '../security/AuthContext';



export default function AddLanguage() {
    
    let navigate = useNavigate();
    const {loggedInUser} = useAuth();

    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth' // Optional, adds smooth scrolling
        });
      };
    

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
        t: "",
        d: "",
        ʈ: "",
        ɖ: "",
        c: "",
        ɟ: "",
        k: "",
        g: "",
        q: "",
        ɢ: "",
        ʔ: "",
        m: "",
        ɱ: "",
        n: "",
        ɳ: "",
        ɲ: "",
        ŋ: "",
        ɴ: "",
        ʙ: "",
        r: "",
        ʀ: "",
        ɾ: "",
        ɽ: "",
        ɸ: "",
        β: "",
        f: "",
        v: "",
        θ: "",
        ð: "",
        s: "",
        z: "",
        ʃ: "",
        ʒ: "",
        ʂ: "",
        ʐ: "",
        ç: "",
        ʝ: "",
        x: "",
        ɣ: "",
        χ: "",
        ʁ: "",
        ħ: "",
        ʕ: "",
        h: "",
        ɦ: "",
        ɬ: "",
        ɮ: "",
        ʋ: "",
        ɹ: "",
        ɻ: "",
        j: "",
        ɰ: "",
        l: "",
        ɭ: "",
        ʎ: "",
        ʟ: ""        
    });
    const [newPrivateComment, setNewPrivateComment] = useState('');
    const {name, description, accessFlag, username}=language;
    const {i, y, ɪ, ʏ, e, ø, ɛ, œ, æ, a, ɨ, ʉ, ɘ, ɵ, ə, ɜ, ɞ, ɐ, ä, ɯ, u, ʊ, ɤ, o, ʌ, ɔ, ɑ, ɒ}=languageVowels;
    const {p,b,t,d,ʈ,ɖ,c,ɟ,k,g,q,ɢ,ʔ,m,ɱ,n,ɳ,ɲ,ŋ,ɴ,ʙ,r,ʀ,ɾ,ɽ,ɸ,β,f,v,θ,ð,s,z,ʃ,ʒ,ʂ,ʐ,ç,ʝ,x,ɣ,χ,ʁ,ħ,ʕ,h,ɦ,ɬ,ɮ,ʋ,ɹ,ɻ,j,ɰ,l,ɭ,ʎ, ʟ} = languageConsonants;

    //UseEffects
    useEffect(() => {
        console.log('Updated Vowels:', languageVowels);
    }, [languageVowels]);
    
    useEffect(() => {
        console.log('Updated Consonants:', languageConsonants);
    }, [languageConsonants]);

    //OnChange 
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
        const {name, checked} = e.target;
        if (e.target.id === "vowel") {
            setLanguageVowels(oldVowels => ({...oldVowels,[name]: checked ? name : ""}));
        } else if (e.target.id === "consonant") {
            setLanguageConsonants(oldConsonants => ({...oldConsonants,[name]: checked ? name : ""}))
        }
        setDummyState((dummy) => !dummy); //rerender page to help checkboxes populate upon click
    }

    const onImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        }
    }

    const onCommentChange=(e)=>{
        setNewPrivateComment(e.target.value);
        console.log(newPrivateComment);
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        const languageFormData = new FormData();
        languageFormData.append('name', language.name);
        languageFormData.append('description', language.description);
        languageFormData.append('accessFlag', language.accessFlag);
        languageFormData.append('username', loggedInUser);
        if (image) {
            languageFormData.append('image', image); 
        }
        
        const vowelFormData = new FormData();
        if (languageVowels) {
            vowelFormData.append('languageName', language.name);
            for (const [key, value] of Object.entries(languageVowels)) {
                vowelFormData.append(key, value);
            }
        }
        
        const consonantFormData = new FormData();
        if (languageConsonants) {
            consonantFormData.append('languageName', language.name);
            for (const [key, value] of Object.entries(languageConsonants)) {
                consonantFormData.append(key, value);
            }
        }

        const commentFormData = new FormData();
        commentFormData.append('username', loggedInUser);
        if (newPrivateComment !== "") {
            commentFormData.append('commentBody', newPrivateComment);
        } else {
            commentFormData.append('commentBody', "");
        }
        commentFormData.append('accessFlag', 'private');
        commentFormData.append('languageName', language.name);

        try {
            const response1 = await api.post("http://localhost:8080/addlanguage", languageFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data', 
                }
            });
            console.log(response1.data);

            const response2 = await api.post("http://localhost:8080/addcomment", commentFormData);
            console.log(response2.data);

            const response3 = await api.post("http://localhost:8080/addlanguage/vowels", vowelFormData);
            console.log(response3.data);

            const response4 = await api.post("http://localhost:8080/addlanguage/consonants", consonantFormData);
            console.log(response4.data);
            if (response1.data == "Language added successfully") { // add other 3 responses here
                navigate("/languages");
            }
        } catch (error) {
            console.log(`Error: ${error.message}`);
        }
    }
    
    return (
        <div className='row shadow'>
            <h1>Add New Language</h1>
            <p className='errorNotification'>{errorMsg}</p>
            <form onSubmit={(e)=> onSubmit(e)}>
                
                <div className="row w-25 position-relative start-50 translate-middle-x pb-4">
                    <div className="text-center mt-3">
                        <label htmlFor="Name" className="form-label">Username</label>
                        <input type={"text"} 
                        className="form-control shadow" 
                        placeholder={loggedInUser} 
                        name="username" 
                        value={loggedInUser}
                        required
                        disabled></input>
                    </div>
                </div>
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
                                    <input className="form-check-input" type="checkbox" name="i" checked={languageVowels.i === "i"} id="vowel"onChange={(e)=>onSoundSelect(e)}/></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">y</label> 
                                    <input className="form-check-input" type="checkbox" name="y" checked={languageVowels.y === "y"} id="vowel" onChange={(e)=>onSoundSelect(e)}/></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɨ</label> 
                                    <input className="form-check-input" type="checkbox" name="ɨ" checked={languageVowels.ɨ === "ɨ"} id="vowel" onChange={(e)=>onSoundSelect(e)}/></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ʉ</label> 
                                    <input className="form-check-input" type="checkbox" name="ʉ" checked={languageVowels.ʉ === "ʉ"} id="vowel" onChange={(e)=>onSoundSelect(e)}/></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɯ</label> 
                                    <input className="form-check-input" type="checkbox" name="ɯ" checked={languageVowels.ɯ === "ɯ"} id="vowel" onChange={(e)=>onSoundSelect(e)}/></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">u</label> 
                                    <input className="form-check-input" type="checkbox" name="u" checked={languageVowels.u === "u"} id="vowel" onChange={(e)=>onSoundSelect(e)}/></td>
                            </tr>
                            <tr>
                                <th>Near-Close</th>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɪ</label> 
                                    <input className="form-check-input" type="checkbox" name="ɪ" checked={languageVowels.ɪ === "ɪ"} id="vowel" onChange={(e)=>onSoundSelect(e)}/></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ʏ</label> 
                                    <input className="form-check-input" type="checkbox" name="ʏ" checked={languageVowels.ʏ === "ʏ"} id="vowel" onChange={(e)=>onSoundSelect(e)}/></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ʊ</label> 
                                    <input className="form-check-input" type="checkbox" name="ʊ" checked={languageVowels.ʊ === "ʊ"} id="vowel" onChange={(e)=>onSoundSelect(e)}/></td>
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
                                    <input className="form-check-input" type="checkbox" name="e" checked={languageVowels.e === "e"} id="vowel" onChange={(e)=>onSoundSelect(e)}/></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ø</label> 
                                    <input className="form-check-input" type="checkbox" name="ø" checked={languageVowels.ø === "ø"} id="vowel" onChange={(e)=>onSoundSelect(e)}/></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɘ</label> 
                                    <input className="form-check-input" type="checkbox" name="ɘ" checked={languageVowels.ɘ === "ɘ"} id="vowel" onChange={(e)=>onSoundSelect(e)}/></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɵ</label> 
                                    <input className="form-check-input" type="checkbox" name="ɵ" checked={languageVowels.ɵ === "ɵ"} id="vowel" onChange={(e)=>onSoundSelect(e)}/></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɤ</label> 
                                    <input className="form-check-input" type="checkbox" name="ɤ" checked={languageVowels.ɤ === "ɤ"} id="vowel" onChange={(e)=>onSoundSelect(e)}/></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">o</label> 
                                    <input className="form-check-input" type="checkbox" name="o" checked={languageVowels.o === "o"} id="vowel" onChange={(e)=>onSoundSelect(e)}/></td>
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
                                    <input className="form-check-input" type="checkbox" name="ə" checked={languageVowels.ə === "ə"} id="vowel" onChange={(e)=>onSoundSelect(e)}/></td>
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
                                    <input className="form-check-input" type="checkbox" name="ɛ" checked={languageVowels.ɛ === "ɛ"} id="vowel" onChange={(e)=>onSoundSelect(e)}/></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">œ</label> 
                                    <input className="form-check-input" type="checkbox" name="œ" checked={languageVowels.œ === "œ"} id="vowel" onChange={(e)=>onSoundSelect(e)}/></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɜ</label> 
                                    <input className="form-check-input" type="checkbox" name="ɜ" checked={languageVowels.ɜ === "ɜ"} id="vowel" onChange={(e)=>onSoundSelect(e)}/></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɞ</label> 
                                    <input className="form-check-input" type="checkbox" name="ɞ" checked={languageVowels.ɞ === "ɞ"} id="vowel" onChange={(e)=>onSoundSelect(e)}/></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ʌ</label> 
                                    <input className="form-check-input" type="checkbox" name="ʌ" checked={languageVowels.ʌ === "ʌ"} id="vowel" onChange={(e)=>onSoundSelect(e)}/></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɔ</label> 
                                    <input className="form-check-input" type="checkbox" name="ɔ" checked={languageVowels.ɔ === "ɔ"} id="vowel" onChange={(e)=>onSoundSelect(e)}/></td>
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
                                    <input className="form-check-input" type="checkbox" name="æ" checked={languageVowels.æ === "æ"} id="vowel" onChange={(e)=>onSoundSelect(e)}/></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɐ</label> 
                                    <input className="form-check-input" type="checkbox" name="ɐ" checked={languageVowels.ɐ === "ɐ"} id="vowel" onChange={(e)=>onSoundSelect(e)}/></td>
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
                                    <input className="form-check-input" type="checkbox" name="a" checked={languageVowels.a === "a"} id="vowel" onChange={(e)=>onSoundSelect(e)}/></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ä</label> 
                                    <input className="form-check-input" type="checkbox" name="ä" checked={languageVowels.ä === "ä"} id="vowel" onChange={(e)=>onSoundSelect(e)}/></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɑ</label> 
                                    <input className="form-check-input" type="checkbox" name="ɑ" checked={languageVowels.ɑ === "ɑ"} id="vowel" onChange={(e)=>onSoundSelect(e)}/></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɒ</label> 
                                    <input className="form-check-input" type="checkbox" name="ɒ" checked={languageVowels.ɒ === "ɒ"} id="vowel" onChange={(e)=>onSoundSelect(e)}/></td>
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
                                    <input className="form-check-input" type="checkbox" name="p" checked={languageConsonants.p === "p"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">b</label>
                                    <input className="form-check-input" type="checkbox" name="b" checked={languageConsonants.b === "b"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">t</label>
                                    <input className="form-check-input" type="checkbox" name="t" checked={languageConsonants.t === "t"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">d</label>
                                    <input className="form-check-input" type="checkbox" name="d" checked={languageConsonants.d === "d"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ʈ</label>
                                    <input className="form-check-input" type="checkbox" name="ʈ" checked={languageConsonants.ʈ === "ʈ"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɖ</label>
                                    <input className="form-check-input" type="checkbox" name="ɖ" checked={languageConsonants.ɖ === "ɖ"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">c</label>
                                    <input className="form-check-input" type="checkbox" name="c" checked={languageConsonants.c === "c"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɟ</label>
                                    <input className="form-check-input" type="checkbox" name="ɟ" checked={languageConsonants.ɟ === "ɟ"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">k</label>
                                    <input className="form-check-input" type="checkbox" name="k" checked={languageConsonants.k === "k"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">g</label>
                                    <input className="form-check-input" type="checkbox" name="g" checked={languageConsonants.g === "g"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">q</label>
                                    <input className="form-check-input" type="checkbox" name="q" checked={languageConsonants.q === "q"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɢ</label>
                                    <input className="form-check-input" type="checkbox" name="ɢ" checked={languageConsonants.ɢ === "ɢ"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ʔ</label>
                                    <input className="form-check-input" type="checkbox" name="ʔ" checked={languageConsonants.ʔ === "ʔ"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <th>Nasal</th>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">m</label>
                                    <input className="form-check-input" type="checkbox" name="m" checked={languageConsonants.m === "m"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɱ</label>
                                    <input className="form-check-input" type="checkbox" name="ɱ" checked={languageConsonants.ɱ === "ɱ"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">n</label>
                                    <input className="form-check-input" type="checkbox" name="n" checked={languageConsonants.n === "n"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɳ</label>
                                    <input className="form-check-input" type="checkbox" name="ɳ" checked={languageConsonants.ɳ === "ɳ"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɲ</label>
                                    <input className="form-check-input" type="checkbox" name="ɲ" checked={languageConsonants.ɲ === "ɲ"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ŋ</label>
                                    <input className="form-check-input" type="checkbox" name="ŋ" checked={languageConsonants.ŋ === "ŋ"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɴ</label>
                                    <input className="form-check-input" type="checkbox" name="ɴ" checked={languageConsonants.ɴ === "ɴ"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
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
                                    <input className="form-check-input" type="checkbox" name="ʙ" checked={languageConsonants.ʙ === "ʙ"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">r</label>
                                    <input className="form-check-input" type="checkbox" name="r" checked={languageConsonants.r === "r"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
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
                                    <input className="form-check-input" type="checkbox" name="ʀ" checked={languageConsonants.ʀ === "ʀ"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
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
                                    <input className="form-check-input" type="checkbox" name="ɾ" checked={languageConsonants.ɾ === "ɾ"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɽ</label>
                                    <input className="form-check-input" type="checkbox" name="ɽ" checked={languageConsonants.ɽ === "ɽ"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
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
                                    <input className="form-check-input" type="checkbox" name="ɸ" checked={languageConsonants.ɸ === "ɸ"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">β</label>
                                    <input className="form-check-input" type="checkbox" name="β" checked={languageConsonants.β === "β"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">f</label>
                                    <input className="form-check-input" type="checkbox" name="f" checked={languageConsonants.f === "f"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">v</label>
                                    <input className="form-check-input" type="checkbox" name="v" checked={languageConsonants.v === "v"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">θ</label>
                                    <input className="form-check-input" type="checkbox" name="θ" checked={languageConsonants.θ === "θ"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ð</label>
                                    <input className="form-check-input" type="checkbox" name="ð" checked={languageConsonants.ð === "ð"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">s</label>
                                    <input className="form-check-input" type="checkbox" name="s" checked={languageConsonants.s === "s"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">z</label>
                                    <input className="form-check-input" type="checkbox" name="z" checked={languageConsonants.z === "z"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ʃ</label>
                                    <input className="form-check-input" type="checkbox" name="ʃ" checked={languageConsonants.ʃ === "ʃ"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ʒ</label>
                                    <input className="form-check-input" type="checkbox" name="ʒ" checked={languageConsonants.ʒ === "ʒ"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ʂ</label>
                                    <input className="form-check-input" type="checkbox" name="ʂ" checked={languageConsonants.ʂ === "ʂ"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ʐ</label>
                                    <input className="form-check-input" type="checkbox" name="ʐ" checked={languageConsonants.ʐ === "ʐ"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ç</label>
                                    <input className="form-check-input" type="checkbox" name="ç" checked={languageConsonants.ç === "ç"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ʝ</label>
                                    <input className="form-check-input" type="checkbox" name="ʝ" checked={languageConsonants.ʝ === "ʝ"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">x</label>
                                    <input className="form-check-input" type="checkbox" name="x" checked={languageConsonants.x === "x"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɣ</label>
                                    <input className="form-check-input" type="checkbox" name="ɣ" checked={languageConsonants.ɣ === "ɣ"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">χ</label>
                                    <input className="form-check-input" type="checkbox" name="χ" checked={languageConsonants.χ === "χ"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ʁ</label>
                                    <input className="form-check-input" type="checkbox" name="ʁ" checked={languageConsonants.ʁ === "ʁ"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ħ</label>
                                    <input className="form-check-input" type="checkbox" name="ħ" checked={languageConsonants.ħ === "ħ"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ʕ</label>
                                    <input className="form-check-input" type="checkbox" name="ʕ" checked={languageConsonants.ʕ === "ʕ"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">h</label>
                                    <input className="form-check-input" type="checkbox" name="h" checked={languageConsonants.h === "h"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɦ</label>
                                    <input className="form-check-input" type="checkbox" name="ɦ" checked={languageConsonants.ɦ === "ɦ"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
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
                                    <input className="form-check-input" type="checkbox" name="ɬ" checked={languageConsonants.ɬ === "ɬ"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɮ</label>
                                    <input className="form-check-input" type="checkbox" name="ɮ" checked={languageConsonants.ɮ === "ɮ"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
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
                                    <input className="form-check-input" type="checkbox" name="ʋ" checked={languageConsonants.ʋ === "ʋ"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɹ</label>
                                    <input className="form-check-input" type="checkbox" name="ɹ" checked={languageConsonants.ɹ === "ɹ"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɻ</label>
                                    <input className="form-check-input" type="checkbox" name="ɻ" checked={languageConsonants.ɻ === "ɻ"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">j</label>
                                    <input className="form-check-input" type="checkbox" name="j" checked={languageConsonants.j === "j"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɰ</label>
                                    <input className="form-check-input" type="checkbox" name="ɰ" checked={languageConsonants.ɰ === "ɰ"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
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
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">l</label>
                                    <input className="form-check-input" type="checkbox" name="l" checked={languageConsonants.l === "l"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɭ</label>
                                    <input className="form-check-input" type="checkbox" name="ɭ" checked={languageConsonants.ɭ === "ɭ"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ʎ</label>
                                    <input className="form-check-input" type="checkbox" name="ʎ" checked={languageConsonants.ʎ === "ʎ"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ʟ</label>
                                    <input className="form-check-input" type="checkbox" name="ʟ" checked={languageConsonants.ʟ === "ʟ"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
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

                <div className="row w-75 position-relative start-50 translate-middle-x">
                    <div className="text-center mt-3">
                        <label htmlFor="Description" className="form-label">Private Comments</label>
                        <textarea type={"text"} 
                        rows="4"
                        className="form-control shadow" 
                        placeholder="Keep them secret.. Keep them safe.." 
                        name="newPrivateComment" 
                        value={newPrivateComment}
                        onChange={(e) => setNewPrivateComment(e.target.value)}
                        ></textarea>
                    </div>
                </div>

                <button type="submit" className="btn btn-outline-primary m-4 shadow">Submit</button>
                <Link className="btn btn-outline-danger m-4 shadow" to="/languages">Cancel</Link>
            </form>
        </div>
    )
}