import React, { useContext , useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { useAuth } from '../security/AuthContext';


export default function Navbar() {


    const { user, isAuthenticated} = useAuth();
    const {logout} = useAuth();
    const navigate = useNavigate()

 const signout = () =>{
    logout();
    navigate("/login");
 }


    return (
        // <div> //comment this div to have sticky work
            <nav className="navbar bg-dark sticky-top navbar-expand-lg bg-body-tertiary border-bottom border-3 border-success">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Polyglot</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="expand" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="expand navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav nav-underline me-auto mb-2 mb-lg-0">
                            {/* <li className="nav-item">
                                <a className="nav-link" href="/">Home</a>
                            </li> */}
                            {(isAuthenticated)   ? <li className='nav-item'>  
                                <a className="nav-link" href="/languages">My Languages</a>
                            </li> : <p></p>}
                            {(isAuthenticated)   ? <li className='nav-item'>
                                <a className="nav-link" href="/favorites">My Favorites</a>
                            </li> : <p></p>}
                            {(isAuthenticated)   ? <li className='nav-item'>
                                <a className="nav-link" href="/compare">Compare</a>
                            </li>  : <p></p>}
                        </ul>
                    </div>

                    {(isAuthenticated)   ? <Link className="btn btn-success" to="/viewprofile" style={{margin:5}}>Profile</Link> : <p></p>}
                    {(!isAuthenticated)   ? <Link className="btn btn-success" to="/login" style={{margin:5}}>Login</Link> : <p></p>}
                    {(!isAuthenticated)   ? <Link className="btn btn-outline-success" to="/addprofile" style={{margin:5}}>Sign Up</Link> : <p></p>}
                    {(isAuthenticated)   ? <Link className="btn btn-outline-success" onClick={signout} style={{margin:5}}>Sign Out</Link> : <p></p>}
                </div>
            </nav>
        //</div>
    )
}