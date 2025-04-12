import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/languages';
import { useAuth } from '../security/AuthContext';



export default function AddLanguage() {
    
    let navigate = useNavigate();
    const {loggedInUser} = useAuth();
    const queryParams = window.location.search;
    

    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth' // Optional, adds smooth scrolling
        });
      };
    
    const [error,setError]=useState('');
    const [color, setColor]=useState('');
    const [language,setLanguage]=useState({});
    const [comment, setComment]=useState({});
    const [newLanguageName, setNewLanguageName] = useState('');
    const [newLanguageDescription, setNewLanguageDescription] = useState('');
    const [newLanguageAccessFlag, setNewLanguageAccessFlag] = useState('');
    const [newImage, setNewImage] = useState();
    const [newLanguageVowels,setNewLanguageVowels]=useState({
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
    });
    const [newLanguageConsonants, setNewLanguageConsonants] = useState({
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
    const [newSyllable, setNewSyllable] = useState({});
    const [newPrivateComment, setNewPrivateComment] = useState('');
    const languageNameParam = newLanguageName;

    //UseEffects
    useEffect(() => {
        //console.log('Updated Vowels:', newLanguageVowels);
    }, [newLanguageVowels]);
    
    useEffect(() => {
        //console.log('Updated Consonants:', newLanguageConsonants);
    }, [newLanguageConsonants]);

    useEffect(()=>{
        const url = `http://localhost:8080/viewlanguage${queryParams}`;
        loadLanguage(url);      
    }, []); 

    useEffect(()=>{
        const url = `http://localhost:8080/language/vowels/${queryParams}`;
        loadVowels(url);        
    }, []);
    
    useEffect(()=>{
        const url = `http://localhost:8080/language/consonants/${queryParams}`;
        loadConsonants(url);        
    }, []);

    useEffect(()=>{
        const url = `http://localhost:8080/language/syllable/${queryParams}`;
        loadSyllables(url);        
    }, []);

    useEffect(()=>{
        loadComments(); 
    }, [language]);

    const onRadioChange=(e)=>{
        setNewLanguageAccessFlag(e.target.id);
        console.log("accessFlag saved to: " + newLanguageAccessFlag);
    }

    const onSoundSelect=(e)=>{
        e.preventDefault();
        const {name, checked} = e.target;
        if (e.target.id === "vowel") {
            setNewLanguageVowels(vowels => ({...vowels,[name]: checked ? "true" : "false"}));
        } else if (e.target.id === "consonant") {
            setNewLanguageConsonants(consonants => ({...consonants,[name]: checked ? "true" : "false"}))
        }
    }

    const onImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewImage(file);
        }
    }

    const onCommentChange=(e)=>{
        setNewPrivateComment(e.target.value);
        console.log(newPrivateComment);
    }

    const loadLanguage = async (url) => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response unsuccessful');
            }
            const data = await response.json();
            setLanguage(data); 
            console.log(data);

            setNewLanguageName(data?.name || '');  
            setNewLanguageDescription(data?.description || '');
            setNewLanguageAccessFlag(data?.accessFlag || '');
            setNewImage(data?.image || '');

            setColor(getRandomColor());
        } catch (err) {
            setError(err.message);
        }
    }

    const loadVowels = async (url) => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            
            data.forEach((vowel, index) => {
                setNewLanguageVowels(vowels => ({...vowels,[vowel.id]: "true"}));
            })
            
        } catch (err) {
            setError(err.message);
        }
    };

    const loadConsonants = async (url) => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            
            data.forEach((consonant, index) => {
                setNewLanguageConsonants(consonants => ({...consonants,[consonant.id]: "true"}));
            })
            
        } catch (err) {
            setError(err.message);
        }
    };

    const loadSyllables = async (url) => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            
            setNewSyllable(data);            
        } catch (err) {
            setError(err.message);
        }
    };

    const loadComments = async () => {
        try {
            const response = await fetch(`http://localhost:8080/comments?accessFlag=private`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            } 
            const data = await response.json();
            data.forEach((comment) => {
                console.log(language.name);
                if (comment.languageName === language.name && comment.username === loggedInUser) {
                    setComment(comment);
                    setNewPrivateComment(comment.commentBody);
                }
            })
            console.log("Comments loaded");
        } catch (err) {
            setError(err.message);
        }
    }

    const colorList = [
        "#FFDAB9", // Peach Pink
        "#800000", // Maroon
        "#FF1493", // Deep Pink
        "#40E0D0", // Turquoise
        "#8A2BE2", // BlueViolet
        "#F4A300", // Sandy Brown
        "#B22222", // Firebrick
    ];

    const getRandomColor = () => {
        const randomIndex = Math.floor(Math.random() * colorList.length);
        return colorList[randomIndex];
    };

    //Image display
    const getMimeTypeFromBase64 = (base64) => {
        if (base64.startsWith('iVBOR')) {
            return 'image/png'; 
        } else if (base64.startsWith('/9j/')) {
            return 'image/jpeg';
        }
        return 'image/jpeg'; // Default to JPEG
    };

    //Handle changes to syllables
    const handleOnsetChange = (e) => {
    setNewSyllable((prev) => ({
        ...prev,
        onsetLength: Math.min(Math.max(prev.onsetLength + e, 0), 3) // Cap between 0 and 3
    }));
    };
    
    const handleCodaChange = (e) => {
    setNewSyllable((prev) => ({
        ...prev,
        codaLength: Math.min(Math.max(prev.codaLength + e, 0), 3) // Cap between 0 and 3
    }));
    };

    const handleOnsetRequiredChange = (e) => {
    setNewSyllable((prev) => ({
        ...prev,
        onsetRequiredLength: Math.min(Math.max(prev.onsetRequiredLength + e, 0), prev.onsetLength)
    }));
    };

    const handleCodaRequiredChange = (e) => {
    setNewSyllable((prev) => ({
        ...prev,
        codaRequiredLength: Math.min(Math.max(prev.codaRequiredLength + e, 0), prev.codaLength)
    }));
    };

    //Syllable display logic
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
        languageFormData.append('name', newLanguageName);
        languageFormData.append('description', newLanguageDescription);
        languageFormData.append('accessFlag', newLanguageAccessFlag);
        if (newImage) {
            languageFormData.append('image', newImage); 
        }

        const commentFormData = new FormData();
        if (newPrivateComment !== "") {
            commentFormData.append('commentBody', newPrivateComment);
        } else {
            commentFormData.append('commentBody', "");
        }
        commentFormData.append('languageName', newLanguageName);
        

        const vowelFormData = new FormData();
        if (newLanguageVowels) {
            for (const [key, value] of Object.entries(newLanguageVowels)) {
                vowelFormData.append(key, value);
            }
        }

        const consonantFormData = new FormData();
        if (newLanguageConsonants) {
            for (const [key, value] of Object.entries(newLanguageConsonants)) {
                consonantFormData.append(key, value);
            }
        }

        const syllableFormData = new FormData();
        syllableFormData.append('syllableId', newSyllable.id);
        syllableFormData.append('onsetLength', newSyllable.onsetLength);
        syllableFormData.append('onsetRequiredLength', newSyllable.onsetRequiredLength);
        syllableFormData.append('codaLength', newSyllable.codaLength);
        syllableFormData.append('codaRequiredLength', newSyllable.codaRequiredLength);

        try {
            const response1 = await api.put(`http://localhost:8080/editlanguage/${language.id}`, languageFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            const response2 = await api.put(`http://localhost:8080/editlanguage/vowels/${language.id}`, vowelFormData);

            const response3 = await api.put(`http://localhost:8080/editlanguage/consonants/${language.id}`, consonantFormData);

            if (!newPrivateComment == undefined) {
                const response4 = await api.put(`http://localhost:8080/editcomment/${comment.id}`, newPrivateComment, newLanguageName);
                console.log(response4.data);
            }

            const response5 = await api.put(`http://localhost:8080/editlanguage/syllable`, syllableFormData);
            
            console.log(response1.data);
            console.log(response2.data);
            console.log(response3.data);
            console.log(response5.data);
            navigate("/languages");
            
        } catch (error) {
            console.log(`Error: ${error.message}`);
        }
    }
    
    return (
        <div className='row shadow'>
            <h1>Edit Language</h1>
            <p className='errorNotification'>{error}</p>
            <form onSubmit={(e)=> onSubmit(e)}>
                <div>
                {newImage ? (
                    <img 
                    src={`data:${getMimeTypeFromBase64(language.image)};base64,${language.image}`}
                    alt="ProfilePicture"
                    className="position-relative rounded-circle"
                    style={{
                        top: '100px',
                        left: '100px',
                        width: '80px',
                        height: '80px',
                        display: 'flex',
                        objectFit: 'cover',
                        zIndex: 10,
                    }}
                    />
                    ) : (
                        <div
                            className="position-relative rounded-circle"
                            style={{
                                top: '100px',
                                left: '100px',
                                width: '80px',
                                height: '80px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: color, 
                                color: 'white',
                                fontSize: '24px',
                                fontWeight: 'bold',
                                fontFamily: "Lobster", 
                            }}
                        >
                            {newLanguageName.charAt(0).toUpperCase()}
                        </div>
                    )}

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
                </div>    

                <div className="row w-50 position-relative start-50 translate-middle-x">
                    <div className="text-center mt-5">
                        <label htmlFor="Name" className="form-label">Language name</label>
                        <input type={"text"} 
                        className="form-control shadow" 
                        placeholder="Enter your language name" 
                        name="name" 
                        value={newLanguageName}
                        onChange={(e)=>setNewLanguageName(e.target.value)}
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
                            onChange={(e) => onImageChange(e)}/>
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
                        value={newLanguageDescription}
                        onChange={(e)=>setNewLanguageDescription(e.target.value)}
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
                            checked={newLanguageAccessFlag === "public"}
                            id="public"/>
                        </label>
                        
                    </div>
                    <div className="form-check">
                        <label className="form-check-label" htmlFor="flexCheckDefault">Private Language
                            <input className="form-check-input" 
                            type="radio" 
                            name="accessFlag"
                            onChange={(e)=>onRadioChange(e)} 
                            checked={newLanguageAccessFlag === "private"}
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
                                    <input className="form-check-input" type="checkbox" name="1" checked={newLanguageVowels[1] === "true"} id="vowel" onChange={(e)=>onSoundSelect(e)}/></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">y</label> 
                                    <input className="form-check-input" type="checkbox" name="2" checked={newLanguageVowels[2] === "true"} id="vowel" onChange={(e)=>onSoundSelect(e)}/></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɨ</label> 
                                    <input className="form-check-input" type="checkbox" name="11" checked={newLanguageVowels[11] === "true"} id="vowel" onChange={(e)=>onSoundSelect(e)}/></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ʉ</label> 
                                    <input className="form-check-input" type="checkbox" name="12" checked={newLanguageVowels[12] === "true"} id="vowel" onChange={(e)=>onSoundSelect(e)}/></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɯ</label> 
                                    <input className="form-check-input" type="checkbox" name="20" checked={newLanguageVowels[20] === "true"} id="vowel" onChange={(e)=>onSoundSelect(e)}/></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">u</label> 
                                    <input className="form-check-input" type="checkbox" name="21" checked={newLanguageVowels[21] === "true"} id="vowel" onChange={(e)=>onSoundSelect(e)}/></td>
                            </tr>
                            <tr>
                                <th>Near-Close</th>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɪ</label> 
                                    <input className="form-check-input" type="checkbox" name="3" checked={newLanguageVowels[3] === "true"} id="vowel" onChange={(e)=>onSoundSelect(e)}/></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ʏ</label> 
                                    <input className="form-check-input" type="checkbox" name="4" checked={newLanguageVowels[4] === "true"} id="vowel" onChange={(e)=>onSoundSelect(e)}/></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ʊ</label> 
                                    <input className="form-check-input" type="checkbox" name="22" checked={newLanguageVowels[22] === "true"} id="vowel" onChange={(e)=>onSoundSelect(e)}/></td>
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
                                    <input className="form-check-input" type="checkbox" name="5" checked={newLanguageVowels[5] === "true"} id="vowel" onChange={(e)=>onSoundSelect(e)}/></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ø</label> 
                                    <input className="form-check-input" type="checkbox" name="6" checked={newLanguageVowels[6] === "true"} id="vowel" onChange={(e)=>onSoundSelect(e)}/></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɘ</label> 
                                    <input className="form-check-input" type="checkbox" name="13" checked={newLanguageVowels[13] === "true"} id="vowel" onChange={(e)=>onSoundSelect(e)}/></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɵ</label> 
                                    <input className="form-check-input" type="checkbox" name="14" checked={newLanguageVowels[14] === "true"} id="vowel" onChange={(e)=>onSoundSelect(e)}/></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɤ</label> 
                                    <input className="form-check-input" type="checkbox" name="23" checked={newLanguageVowels[23] === "true"} id="vowel" onChange={(e)=>onSoundSelect(e)}/></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">o</label> 
                                    <input className="form-check-input" type="checkbox" name="24" checked={newLanguageVowels[24] === "true"} id="vowel" onChange={(e)=>onSoundSelect(e)}/></td>
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
                                    <input className="form-check-input" type="checkbox" name="15" checked={newLanguageVowels[15] === "true"} id="vowel" onChange={(e)=>onSoundSelect(e)}/></td>
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
                                    <input className="form-check-input" type="checkbox" name="7" checked={newLanguageVowels[7] === "true"} id="vowel" onChange={(e)=>onSoundSelect(e)}/></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">œ</label> 
                                    <input className="form-check-input" type="checkbox" name="8" checked={newLanguageVowels[8] === "true"} id="vowel" onChange={(e)=>onSoundSelect(e)}/></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɜ</label> 
                                    <input className="form-check-input" type="checkbox" name="16" checked={newLanguageVowels[16] === "true"} id="vowel" onChange={(e)=>onSoundSelect(e)}/></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɞ</label> 
                                    <input className="form-check-input" type="checkbox" name="17" checked={newLanguageVowels[17] === "true"} id="vowel" onChange={(e)=>onSoundSelect(e)}/></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ʌ</label> 
                                    <input className="form-check-input" type="checkbox" name="25" checked={newLanguageVowels[25] === "true"} id="vowel" onChange={(e)=>onSoundSelect(e)}/></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɔ</label> 
                                    <input className="form-check-input" type="checkbox" name="26" checked={newLanguageVowels[26] === "true"} id="vowel" onChange={(e)=>onSoundSelect(e)}/></td>
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
                                    <input className="form-check-input" type="checkbox" name="9" checked={newLanguageVowels[9] === "true"} id="vowel" onChange={(e)=>onSoundSelect(e)}/></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɐ</label> 
                                    <input className="form-check-input" type="checkbox" name="19" checked={newLanguageVowels[19] === "true"} id="vowel" onChange={(e)=>onSoundSelect(e)}/></td>
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
                                    <input className="form-check-input" type="checkbox" name="10" checked={newLanguageVowels[10] === "true"} id="vowel" onChange={(e)=>onSoundSelect(e)}/></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ä</label> 
                                    <input className="form-check-input" type="checkbox" name="19" checked={newLanguageVowels[19] === "true"} id="vowel" onChange={(e)=>onSoundSelect(e)}/></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɑ</label> 
                                    <input className="form-check-input" type="checkbox" name="27" checked={newLanguageVowels[27] === "true"} id="vowel" onChange={(e)=>onSoundSelect(e)}/></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɒ</label> 
                                    <input className="form-check-input" type="checkbox" name="28" checked={newLanguageVowels[28] === "true"} id="vowel" onChange={(e)=>onSoundSelect(e)}/></td>
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
                                    <input className="form-check-input" type="checkbox" name="1" checked={newLanguageConsonants[1] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">b</label>
                                    <input className="form-check-input" type="checkbox" name="2" checked={newLanguageConsonants[2] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">t</label>
                                    <input className="form-check-input" type="checkbox" name="3" checked={newLanguageConsonants[3] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">d</label>
                                    <input className="form-check-input" type="checkbox" name="4" checked={newLanguageConsonants[4] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ʈ</label>
                                    <input className="form-check-input" type="checkbox" name="5" checked={newLanguageConsonants[5] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɖ</label>
                                    <input className="form-check-input" type="checkbox" name="6" checked={newLanguageConsonants[6] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">c</label>
                                    <input className="form-check-input" type="checkbox" name="7" checked={newLanguageConsonants[7] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɟ</label>
                                    <input className="form-check-input" type="checkbox" name="8" checked={newLanguageConsonants[8] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">k</label>
                                    <input className="form-check-input" type="checkbox" name="9" checked={newLanguageConsonants[9] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">g</label>
                                    <input className="form-check-input" type="checkbox" name="10" checked={newLanguageConsonants[10] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">q</label>
                                    <input className="form-check-input" type="checkbox" name="11" checked={newLanguageConsonants[11] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɢ</label>
                                    <input className="form-check-input" type="checkbox" name="12" checked={newLanguageConsonants[12] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ʔ</label>
                                    <input className="form-check-input" type="checkbox" name="13" checked={newLanguageConsonants[13] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <th>Nasal</th>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">m</label>
                                    <input className="form-check-input" type="checkbox" name="14" checked={newLanguageConsonants[14] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɱ</label>
                                    <input className="form-check-input" type="checkbox" name="15" checked={newLanguageConsonants[15] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">n</label>
                                    <input className="form-check-input" type="checkbox" name="16" checked={newLanguageConsonants[16] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɳ</label>
                                    <input className="form-check-input" type="checkbox" name="17" checked={newLanguageConsonants[17] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɲ</label>
                                    <input className="form-check-input" type="checkbox" name="18" checked={newLanguageConsonants[18] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ŋ</label>
                                    <input className="form-check-input" type="checkbox" name="19" checked={newLanguageConsonants[19] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɴ</label>
                                    <input className="form-check-input" type="checkbox" name="20" checked={newLanguageConsonants[20] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
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
                                    <input className="form-check-input" type="checkbox" name="21" checked={newLanguageConsonants[21] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">r</label>
                                    <input className="form-check-input" type="checkbox" name="22" checked={newLanguageConsonants[22] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
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
                                    <input className="form-check-input" type="checkbox" name="23" checked={newLanguageConsonants[23] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
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
                                    <input className="form-check-input" type="checkbox" name="24" checked={newLanguageConsonants[24] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɽ</label>
                                    <input className="form-check-input" type="checkbox" name="25" checked={newLanguageConsonants[25] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
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
                                    <input className="form-check-input" type="checkbox" name="26" checked={newLanguageConsonants[26] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">β</label>
                                    <input className="form-check-input" type="checkbox" name="27" checked={newLanguageConsonants[27] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">f</label>
                                    <input className="form-check-input" type="checkbox" name="28" checked={newLanguageConsonants[28] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">v</label>
                                    <input className="form-check-input" type="checkbox" name="29" checked={newLanguageConsonants[29] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">θ</label>
                                    <input className="form-check-input" type="checkbox" name="30" checked={newLanguageConsonants[30] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ð</label>
                                    <input className="form-check-input" type="checkbox" name="31" checked={newLanguageConsonants[31] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">s</label>
                                    <input className="form-check-input" type="checkbox" name="32" checked={newLanguageConsonants[32] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">z</label>
                                    <input className="form-check-input" type="checkbox" name="33" checked={newLanguageConsonants[33] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ʃ</label>
                                    <input className="form-check-input" type="checkbox" name="34" checked={newLanguageConsonants[34] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ʒ</label>
                                    <input className="form-check-input" type="checkbox" name="35" checked={newLanguageConsonants[35] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ʂ</label>
                                    <input className="form-check-input" type="checkbox" name="36" checked={newLanguageConsonants[36] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ʐ</label>
                                    <input className="form-check-input" type="checkbox" name="37" checked={newLanguageConsonants[37] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ç</label>
                                    <input className="form-check-input" type="checkbox" name="38" checked={newLanguageConsonants[38] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ʝ</label>
                                    <input className="form-check-input" type="checkbox" name="39" checked={newLanguageConsonants[39] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">x</label>
                                    <input className="form-check-input" type="checkbox" name="40" checked={newLanguageConsonants[40] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɣ</label>
                                    <input className="form-check-input" type="checkbox" name="41" checked={newLanguageConsonants[41] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">χ</label>
                                    <input className="form-check-input" type="checkbox" name="42" checked={newLanguageConsonants[42] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ʁ</label>
                                    <input className="form-check-input" type="checkbox" name="43" checked={newLanguageConsonants[43] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ħ</label>
                                    <input className="form-check-input" type="checkbox" name="44" checked={newLanguageConsonants[44] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ʕ</label>
                                    <input className="form-check-input" type="checkbox" name="45" checked={newLanguageConsonants[45] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">h</label>
                                    <input className="form-check-input" type="checkbox" name="46" checked={newLanguageConsonants[46] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɦ</label>
                                    <input className="form-check-input" type="checkbox" name="47" checked={newLanguageConsonants[47] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
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
                                    <input className="form-check-input" type="checkbox" name="48" checked={newLanguageConsonants[48] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɮ</label>
                                    <input className="form-check-input" type="checkbox" name="49" checked={newLanguageConsonants[49] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
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
                                    <input className="form-check-input" type="checkbox" name="50" checked={newLanguageConsonants[50] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɹ</label>
                                    <input className="form-check-input" type="checkbox" name="51" checked={newLanguageConsonants[51] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɻ</label>
                                    <input className="form-check-input" type="checkbox" name="52" checked={newLanguageConsonants[52] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">j</label>
                                    <input className="form-check-input" type="checkbox" name="53" checked={newLanguageConsonants[53] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɰ</label>
                                    <input className="form-check-input" type="checkbox" name="54" checked={newLanguageConsonants[54] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
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
                                    <input className="form-check-input" type="checkbox" name="55" checked={newLanguageConsonants[55] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ɭ</label>
                                    <input className="form-check-input" type="checkbox" name="56" checked={newLanguageConsonants[56] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ʎ</label>
                                    <input className="form-check-input" type="checkbox" name="57" checked={newLanguageConsonants[57] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
                                </td>
                                <td></td>
                                <td>
                                    <label className="form-check-label w-100" htmlFor="flexCheckChecked">ʟ</label>
                                    <input className="form-check-input" type="checkbox" name="58" checked={newLanguageConsonants[58] === "true"} id="consonant" onChange={(e)=>onSoundSelect(e)}/>
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
                        {renderSyllableItems(newSyllable.onsetLength, newSyllable.onsetRequiredLength)} V{" "}
                        {renderSyllableItems(newSyllable.codaLength, newSyllable.codaRequiredLength)}
                    </div>

                    <div className="mt-5">
                        <button className="btn btn-outline-primary m-1" type="button" onClick={() => handleOnsetChange(1)} disabled={newSyllable.onsetLength >= 3}>+ Onset</button>
                        <button className="btn btn-outline-primary m-1 me-3" type="button" onClick={() => handleOnsetChange(-1)} disabled={newSyllable.onsetLength <= 0}>- Onset</button>
                        <button className="btn btn-outline-primary m-1 ms-3" type="button" onClick={() => handleCodaChange(1)} disabled={newSyllable.codaLength >= 3}>+ Coda</button>
                        <button className="btn btn-outline-primary m-1" type="button" onClick={() => handleCodaChange(-1)} disabled={newSyllable.codaLength <= 0}>- Coda</button>
                    </div>

                    <div>
                        <button className="btn btn-outline-primary m-1" type="button" onClick={() => handleOnsetRequiredChange(1)} disabled={newSyllable.onsetRequiredLength >= newSyllable.onsetLength}>+ Required Onset</button>
                        <button className="btn btn-outline-primary m-1 me-3" type="button" onClick={() => handleOnsetRequiredChange(-1)} disabled={newSyllable.onsetRequiredLength <= 0}>- Required Onset</button>
                        <button className="btn btn-outline-primary m-1 ms-3" type="button" onClick={() => handleCodaRequiredChange(1)} disabled={newSyllable.codaRequiredLength >= newSyllable.codaLength}>+ Required Coda</button>
                        <button className="btn btn-outline-primary m-1" type="button" onClick={() => handleCodaRequiredChange(-1)} disabled={newSyllable.codaRequiredLength <= 0}>- Required Coda</button>
                    </div>
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
                        onChange={(e) => onCommentChange(e)}
                        ></textarea>
                    </div>
                </div>

                <button type="submit" className="btn btn-outline-primary m-4 shadow">Submit</button>
                <Link className="btn btn-outline-danger m-4 shadow" to="/languages">Cancel</Link>
            </form>
        </div>
    )
}