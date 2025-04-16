import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
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
        1:"",
        2:"",
        3:"",
        4:"",
        5:"",
        6:"",
        7:"",
        8:"",
        9:"",
        10:"",
        11:"",
        12:"",
        13:"",
        14:"",
        15:"",
        16:"",
        17:"",
        18:"",
        19:"",
        20:"",
        21:"",
        22:"",
        23:"",
        24:"",
        25:"",
        26:"",
        27:"",
        28:""
    })
    const [languageConsonants, setLanguageConsonants] = useState({
        1: "",
        2: "",
        3: "",
        4: "",
        5: "",
        6: "",
        7: "",
        8: "",
        9: "",
        10: "",
        11: "",
        12: "",
        13: "",
        14: "",
        15: "",
        16: "",
        17: "",
        18: "",
        19: "",
        20: "",
        21: "",
        22: "",
        23: "",
        24: "",
        25: "",
        26: "",
        27: "",
        28: "",
        29: "",
        30: "",
        31: "",
        32: "",
        33: "",
        34: "",
        35: "",
        36: "",
        37: "",
        38: "",
        39: "",
        40: "",
        41: "",
        42: "",
        43: "",
        44: "",
        45: "",
        46: "",
        47: "",
        48: "",
        49: "",
        50: "",
        51: "",
        52: "",
        53: "",
        54: "",
        55: "",
        56: "",
        57: "",
        58: ""        
    });
    const [syllable, setSyllable] = useState({
        onsetLength :  0,
        codaLength: 0,
        onsetRequiredLength: 0,
        codaRequiredLength: 0
    });
    const [newPrivateComment, setNewPrivateComment] = useState('');
    const {name, description, accessFlag, username}=language;

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
            setLanguageVowels(oldVowels => ({...oldVowels,[name]: checked ? "true" : "false"}));
        } else if (e.target.id === "consonant") {
            setLanguageConsonants(oldConsonants => ({...oldConsonants,[name]: checked ? "true" : "false"}))
        }
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

    const handleOnsetChange = (e) => {
        setSyllable((prev) => ({
          ...prev,
          onsetLength: Math.min(Math.max(prev.onsetLength + e, 0), 3) // Cap between 0 and 3
        }));
      };
    
    const handleCodaChange = (e) => {
    setSyllable((prev) => ({
        ...prev,
        codaLength: Math.min(Math.max(prev.codaLength + e, 0), 3) // Cap between 0 and 3
    }));
    };

    const handleOnsetRequiredChange = (e) => {
    setSyllable((prev) => ({
        ...prev,
        onsetRequiredLength: Math.min(Math.max(prev.onsetRequiredLength + e, 0), prev.onsetLength)
    }));
    };

    const handleCodaRequiredChange = (e) => {
    setSyllable((prev) => ({
        ...prev,
        codaRequiredLength: Math.min(Math.max(prev.codaRequiredLength + e, 0), prev.codaLength)
    }));
    };

    const renderSyllableItems = (length, requiredLength) => {
        const requiredC = Array.from({ length: requiredLength }, (_, i) => "C");
        const unrequiredC = Array.from({ length: length - requiredLength }, (_, i) => "( C )");

        return [...requiredC, ...unrequiredC].map((item, index) => (
            <span key={index}>{item} </span>
        ));
    };

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


        const commentFormData = new FormData();
        commentFormData.append('username', loggedInUser);
        if (newPrivateComment !== "") {
            commentFormData.append('commentBody', newPrivateComment);
        } else {
            commentFormData.append('commentBody', "");
        }
        commentFormData.append('accessFlag', 'private');
        commentFormData.append('languageName', language.name);

        const syllableFormData = new FormData();
        console.log("Attempting to add the following syllable data: "+ syllable.onsetLength + syllable.codaLength + syllable.onsetRequiredLength + syllable.codaRequiredLength);
        syllableFormData.append('onsetLength', syllable.onsetLength);
        syllableFormData.append('codaLength', syllable.codaLength);
        syllableFormData.append('onsetRequiredLength', syllable.onsetRequiredLength);
        syllableFormData.append('codaRequiredLength', syllable.codaRequiredLength);

        try {
            const response1 = await api.post("http://localhost:8080/addlanguage", languageFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            
            if (response1.data.message === "Language successfully added") {
                const languageId = response1.data.id;
                console.log("Language created with ID: " + languageId);
                
                const vowelFormData = new FormData();
                const consonantFormData = new FormData();
    
                if (languageVowels) {
                    for (const [key, value] of Object.entries(languageVowels)) {
                        vowelFormData.append(key, value);
                    }
                }
                const response2 = await api.post(`http://localhost:8080/addlanguage/vowels/${languageId}`, vowelFormData);
                console.log(response2.data);
    
                if (languageConsonants) {
                    for (const [key, value] of Object.entries(languageConsonants)) {
                        consonantFormData.append(key, value);
                    }
                }
                const response3 = await api.post(`http://localhost:8080/addlanguage/consonants/${languageId}`, consonantFormData);
                console.log(response3.data);
    
                const response4 = await api.post("http://localhost:8080/addcomment", commentFormData);
                console.log(response4.data);

                const response5 = await api.post(`http://localhost:8080/addlanguage/syllable/${languageId}`, syllableFormData);
                console.log(response5.data);
    
                navigate("/languages");
            } else {
                console.log("Error in adding language:", response1.data);
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
                            id="public" required/>
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
                                    <input className="form-check-input" type="checkbox" name="1" checked={languageVowels[1] === "true"} id="vowel" onChange={(e)=>onSoundSelect(e)}/></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">y</label> 
                                    <input className="form-check-input" type="checkbox" name="2" checked={languageVowels[2] === "true"} id="vowel" onChange={(e)=>onSoundSelect(e)}/></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɨ</label> 
                                    <input className="form-check-input" type="checkbox" name="11" checked={languageVowels[11] === "true"} id="vowel" onChange={(e)=>onSoundSelect(e)}/></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ʉ</label> 
                                    <input className="form-check-input" type="checkbox" name="12" checked={languageVowels[12] === "true"} id="vowel" onChange={(e)=>onSoundSelect(e)}/></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɯ</label> 
                                    <input className="form-check-input" type="checkbox" name="20" checked={languageVowels[20] === "true"} id="vowel" onChange={(e)=>onSoundSelect(e)}/></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">u</label> 
                                    <input className="form-check-input" type="checkbox" name="21" checked={languageVowels[21] === "true"} id="vowel" onChange={(e)=>onSoundSelect(e)}/></td>
                            </tr>
                            <tr>
                                <th>Near-Close</th>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɪ</label> 
                                    <input className="form-check-input" type="checkbox" name="3" checked={languageVowels[3] === "true"} id="vowel" onChange={(e)=>onSoundSelect(e)}/></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ʏ</label> 
                                    <input className="form-check-input" type="checkbox" name="4" checked={languageVowels[4] === "true"} id="vowel" onChange={(e)=>onSoundSelect(e)}/></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ʊ</label> 
                                    <input className="form-check-input" type="checkbox" name="22" checked={languageVowels[22] === "true"} id="vowel" onChange={(e)=>onSoundSelect(e)}/></td>
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
                                    <input className="form-check-input" type="checkbox" name="5" checked={languageVowels[5] === "true"} id="vowel" onChange={(e)=>onSoundSelect(e)}/></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ø</label> 
                                    <input className="form-check-input" type="checkbox" name="6" checked={languageVowels[6] === "true"} id="vowel" onChange={(e)=>onSoundSelect(e)}/></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɘ</label> 
                                    <input className="form-check-input" type="checkbox" name="13" checked={languageVowels[13] === "true"} id="vowel" onChange={(e)=>onSoundSelect(e)}/></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɵ</label> 
                                    <input className="form-check-input" type="checkbox" name="14" checked={languageVowels[14] === "true"} id="vowel" onChange={(e)=>onSoundSelect(e)}/></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɤ</label> 
                                    <input className="form-check-input" type="checkbox" name="23" checked={languageVowels[23] === "true"} id="vowel" onChange={(e)=>onSoundSelect(e)}/></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">o</label> 
                                    <input className="form-check-input" type="checkbox" name="24" checked={languageVowels[24] === "true"} id="vowel" onChange={(e)=>onSoundSelect(e)}/></td>
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
                                    <input className="form-check-input" type="checkbox" name="15" checked={languageVowels[15] === "true"} id="vowel" onChange={(e)=>onSoundSelect(e)}/></td>
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
                                    <input className="form-check-input" type="checkbox" name="7" checked={languageVowels[7] === "true"} id="vowel" onChange={(e)=>onSoundSelect(e)}/></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">œ</label> 
                                    <input className="form-check-input" type="checkbox" name="8" checked={languageVowels[8] === "true"} id="vowel" onChange={(e)=>onSoundSelect(e)}/></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɜ</label> 
                                    <input className="form-check-input" type="checkbox" name="16" checked={languageVowels[16] === "true"} id="vowel" onChange={(e)=>onSoundSelect(e)}/></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɞ</label> 
                                    <input className="form-check-input" type="checkbox" name="17" checked={languageVowels[17] === "true"} id="vowel" onChange={(e)=>onSoundSelect(e)}/></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ʌ</label> 
                                    <input className="form-check-input" type="checkbox" name="25" checked={languageVowels[25] === "true"} id="vowel" onChange={(e)=>onSoundSelect(e)}/></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɔ</label> 
                                    <input className="form-check-input" type="checkbox" name="26" checked={languageVowels[26] === "true"} id="vowel" onChange={(e)=>onSoundSelect(e)}/></td>
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
                                    <input className="form-check-input" type="checkbox" name="9" checked={languageVowels[9] === "true"} id="vowel" onChange={(e)=>onSoundSelect(e)}/></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɐ</label> 
                                    <input className="form-check-input" type="checkbox" name="19" checked={languageVowels[19] === "true"} id="vowel" onChange={(e)=>onSoundSelect(e)}/></td>
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
                                    <input className="form-check-input" type="checkbox" name="10" checked={languageVowels[10] === "true"} id="vowel" onChange={(e)=>onSoundSelect(e)}/></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ä</label> 
                                    <input className="form-check-input" type="checkbox" name="19" checked={languageVowels[19] === "true"} id="vowel" onChange={(e)=>onSoundSelect(e)}/></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɑ</label> 
                                    <input className="form-check-input" type="checkbox" name="27" checked={languageVowels[27] === "true"} id="vowel" onChange={(e)=>onSoundSelect(e)}/></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɒ</label> 
                                    <input className="form-check-input" type="checkbox" name="28" checked={languageVowels[28] === "true"} id="vowel" onChange={(e)=>onSoundSelect(e)}/></td>
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
                                    <input className="form-check-input" type="checkbox" name="1" checked={languageConsonants[1] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">b</label>
                                    <input className="form-check-input" type="checkbox" name="2" checked={languageConsonants[2] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">t</label>
                                    <input className="form-check-input" type="checkbox" name="3" checked={languageConsonants[3] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">d</label>
                                    <input className="form-check-input" type="checkbox" name="4" checked={languageConsonants[4] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ʈ</label>
                                    <input className="form-check-input" type="checkbox" name="5" checked={languageConsonants[5] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɖ</label>
                                    <input className="form-check-input" type="checkbox" name="6" checked={languageConsonants[6] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">c</label>
                                    <input className="form-check-input" type="checkbox" name="7" checked={languageConsonants[7] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɟ</label>
                                    <input className="form-check-input" type="checkbox" name="8" checked={languageConsonants[8] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">k</label>
                                    <input className="form-check-input" type="checkbox" name="9" checked={languageConsonants[9] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">g</label>
                                    <input className="form-check-input" type="checkbox" name="10" checked={languageConsonants[10] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">q</label>
                                    <input className="form-check-input" type="checkbox" name="11" checked={languageConsonants[11] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɢ</label>
                                    <input className="form-check-input" type="checkbox" name="12" checked={languageConsonants[12] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ʔ</label>
                                    <input className="form-check-input" type="checkbox" name="13" checked={languageConsonants[13] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <th>Nasal</th>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">m</label>
                                    <input className="form-check-input" type="checkbox" name="14" checked={languageConsonants[14] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɱ</label>
                                    <input className="form-check-input" type="checkbox" name="15" checked={languageConsonants[15] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">n</label>
                                    <input className="form-check-input" type="checkbox" name="16" checked={languageConsonants[16] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɳ</label>
                                    <input className="form-check-input" type="checkbox" name="17" checked={languageConsonants[17] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɲ</label>
                                    <input className="form-check-input" type="checkbox" name="18" checked={languageConsonants[18] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ŋ</label>
                                    <input className="form-check-input" type="checkbox" name="19" checked={languageConsonants[19] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɴ</label>
                                    <input className="form-check-input" type="checkbox" name="20" checked={languageConsonants[20] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
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
                                    <input className="form-check-input" type="checkbox" name="21" checked={languageConsonants[21] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">r</label>
                                    <input className="form-check-input" type="checkbox" name="22" checked={languageConsonants[22] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
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
                                    <input className="form-check-input" type="checkbox" name="23" checked={languageConsonants[23] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
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
                                    <input className="form-check-input" type="checkbox" name="24" checked={languageConsonants[24] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɽ</label>
                                    <input className="form-check-input" type="checkbox" name="25" checked={languageConsonants[25] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
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
                                    <input className="form-check-input" type="checkbox" name="26" checked={languageConsonants[26] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">β</label>
                                    <input className="form-check-input" type="checkbox" name="27" checked={languageConsonants[27] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">f</label>
                                    <input className="form-check-input" type="checkbox" name="28" checked={languageConsonants[28] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">v</label>
                                    <input className="form-check-input" type="checkbox" name="29" checked={languageConsonants[29] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">θ</label>
                                    <input className="form-check-input" type="checkbox" name="30" checked={languageConsonants[30] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ð</label>
                                    <input className="form-check-input" type="checkbox" name="31" checked={languageConsonants[31] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">s</label>
                                    <input className="form-check-input" type="checkbox" name="32" checked={languageConsonants[32] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">z</label>
                                    <input className="form-check-input" type="checkbox" name="33" checked={languageConsonants[33] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ʃ</label>
                                    <input className="form-check-input" type="checkbox" name="34" checked={languageConsonants[34] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ʒ</label>
                                    <input className="form-check-input" type="checkbox" name="35" checked={languageConsonants[35] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ʂ</label>
                                    <input className="form-check-input" type="checkbox" name="36" checked={languageConsonants[36] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ʐ</label>
                                    <input className="form-check-input" type="checkbox" name="37" checked={languageConsonants[37] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ç</label>
                                    <input className="form-check-input" type="checkbox" name="38" checked={languageConsonants[38] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ʝ</label>
                                    <input className="form-check-input" type="checkbox" name="39" checked={languageConsonants[39] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">x</label>
                                    <input className="form-check-input" type="checkbox" name="40" checked={languageConsonants[40] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɣ</label>
                                    <input className="form-check-input" type="checkbox" name="41" checked={languageConsonants[41] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">χ</label>
                                    <input className="form-check-input" type="checkbox" name="42" checked={languageConsonants[42] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ʁ</label>
                                    <input className="form-check-input" type="checkbox" name="43" checked={languageConsonants[43] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ħ</label>
                                    <input className="form-check-input" type="checkbox" name="44" checked={languageConsonants[44] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ʕ</label>
                                    <input className="form-check-input" type="checkbox" name="45" checked={languageConsonants[45] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">h</label>
                                    <input className="form-check-input" type="checkbox" name="46" checked={languageConsonants[46] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɦ</label>
                                    <input className="form-check-input" type="checkbox" name="47" checked={languageConsonants[47] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
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
                                    <input className="form-check-input" type="checkbox" name="48" checked={languageConsonants[48] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɮ</label>
                                    <input className="form-check-input" type="checkbox" name="49" checked={languageConsonants[49] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
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
                                    <input className="form-check-input" type="checkbox" name="50" checked={languageConsonants[50] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɹ</label>
                                    <input className="form-check-input" type="checkbox" name="51" checked={languageConsonants[51] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɻ</label>
                                    <input className="form-check-input" type="checkbox" name="52" checked={languageConsonants[52] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">j</label>
                                    <input className="form-check-input" type="checkbox" name="53" checked={languageConsonants[53] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɰ</label>
                                    <input className="form-check-input" type="checkbox" name="54" checked={languageConsonants[54] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
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
                                    <input className="form-check-input" type="checkbox" name="55" checked={languageConsonants[55] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɭ</label>
                                    <input className="form-check-input" type="checkbox" name="56" checked={languageConsonants[56] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ʎ</label>
                                    <input className="form-check-input" type="checkbox" name="57" checked={languageConsonants[57] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ʟ</label>
                                    <input className="form-check-input" type="checkbox" name="58" checked={languageConsonants[58] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
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

                <div>
                    <div>
                        <h4>Syllable Selection</h4>
                        <p>Please use the buttons to indicate how many consonants (C) are present before and after your syllable's vowel nucleus: V</p>
                        <p className="mb-5">Note: All consonants displayed in parentheses are considered optional in any given syllable.</p>
                    </div>
                    <div>
                        {renderSyllableItems(syllable.onsetLength, syllable.onsetRequiredLength)} V{" "}
                        {renderSyllableItems(syllable.codaLength, syllable.codaRequiredLength)}
                    </div>

                    <div className="mt-5">
                        <button className="btn btn-outline-primary m-1" type="button" onClick={() => handleOnsetChange(1)} disabled={syllable.onsetLength >= 3}>+ Onset</button>
                        <button className="btn btn-outline-primary m-1 me-3" type="button" onClick={() => handleOnsetChange(-1)} disabled={syllable.onsetLength <= 0}>- Onset</button>
                        <button className="btn btn-outline-primary m-1 ms-3" type="button" onClick={() => handleCodaChange(1)} disabled={syllable.codaLength >= 3}>+ Coda</button>
                        <button className="btn btn-outline-primary m-1" type="button" onClick={() => handleCodaChange(-1)} disabled={syllable.codaLength <= 0}>- Coda</button>
                    </div>

                    <div>
                        <button className="btn btn-outline-primary m-1" type="button" onClick={() => handleOnsetRequiredChange(1)} disabled={syllable.onsetRequiredLength >= syllable.onsetLength}>+ Required Onset</button>
                        <button className="btn btn-outline-primary m-1 me-3" type="button" onClick={() => handleOnsetRequiredChange(-1)} disabled={syllable.onsetRequiredLength <= 0}>- Required Onset</button>
                        <button className="btn btn-outline-primary m-1 ms-3" type="button" onClick={() => handleCodaRequiredChange(1)} disabled={syllable.codaRequiredLength >= syllable.codaLength}>+ Required Coda</button>
                        <button className="btn btn-outline-primary m-1" type="button" onClick={() => handleCodaRequiredChange(-1)} disabled={syllable.codaRequiredLength <= 0}>- Required Coda</button>
                    </div>
                </div>

                <div className="row w-75 position-relative start-50 translate-middle-x mt-4">
                    <div className="text-center mt-3">
                        <h5 htmlFor="Description" className="form-label">Private Comments</h5>
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