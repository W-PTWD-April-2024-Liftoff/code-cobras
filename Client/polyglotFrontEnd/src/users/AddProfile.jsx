import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function AddProfile() {

    let navigate = useNavigate;
    
    const [user,setUser]=useState({
        username:"",
        email:"",
        bio:""
    });

    const {username, email, bio}=user;

    const onInputChange=(e)=>{
        setUser({...user,[e.target.name]:e.target.value});
    }

    const onSubmit= async(e)=>{
        e.preventDefault();
        await axios.post("http://localhost:8080/addprofile", user);
        navigate("/viewprofile");
    }
    
    return (
        <div className='container'>
            <div className='container border border-primary border-3 rounded shadow-lg p-4 mt-4'>
                <h2>Create a Profile</h2>
                <p>Join the Polyglot community!</p>
            </div>
            
            <form onSubmit={(e)=> onSubmit(e)}>
                <div className="row">
                    <div className="text-center mt-5">
                        <label htmlFor="Username" className="form-label">Username</label>
                        <input type={"text"} 
                        className="form-control shadow" 
                        placeholder="Enter your username" 
                        name="username" 
                        value={username}
                        onChange={(e)=>onInputChange(e)}
                        required 
                        autoFocus="true"></input>
                    </div>
                </div>
                <div className="row">
                    <div className="text-center mt-3">
                        <label htmlFor="Email" className="form-label">Email</label>
                        <input type={"email"} 
                        className="form-control shadow" 
                        placeholder="Enter your email address" 
                        name="email" 
                        value={email}
                        onChange={(e)=>onInputChange(e)}
                        required></input>
                    </div>
                </div>
                <div className="row">
                    <div className="text-center mt-5">
                        <label htmlFor="Bio" className="form-label">Bio</label>
                        <input type={"textbox"} 
                        className="form-control shadow p-5" 
                        placeholder="Tell us why you're here!" 
                        name="bio"
                        value={bio}
                        onChange={(e)=>onInputChange(e)}></input>
                    </div>
                </div>
                <button type="submit" className="btn btn-outline-primary m-4 shadow">Submit</button>
                <Link className="btn btn-outline-danger m-4 shadow" to="/">Cancel</Link>
            </form>
        </div>
    )
}