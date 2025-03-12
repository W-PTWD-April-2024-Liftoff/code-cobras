import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <div>
            <nav className="navbar bg-dark sticky-top navbar-expand-lg bg-body-tertiary border-bottom border-3 border-success">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Polyglot</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="expand" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="expand navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav nav-underline me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link" href="/">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/favorites">My Favorites</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/compare">Compare</a>
                            </li>
                        </ul>
                    </div>

                    <Link className="btn btn-success" to="/viewprofile" style={{margin:5}}>Login</Link>
                    <Link className="btn btn-outline-success" to="/addprofile" style={{margin:5}}>Sign Up</Link>
                </div>
            </nav>
        </div>
    )
}