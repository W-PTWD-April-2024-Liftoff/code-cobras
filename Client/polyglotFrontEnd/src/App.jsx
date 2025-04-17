import { useEffect, useState } from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import api from './api/languages'
import Navbar from './layout/Navbar'
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import Compare from './pages/Compare'
import AddProfile from './users/AddProfile'
import ViewProfile from './users/ViewProfile'
import EditProfile from './users/EditProfile'
import AddLanguage from './languages/AddLanguage'
import ViewLanguage from './languages/ViewLanguage'
import EditLanguage from './languages/EditLanguage'
import MyLanguages from './languages/MyLanguages'

import LoginPage from './pages/LoginPage'
import CallbackPage from './pages/CallbackPage'
import React from 'react'




import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import { AuthProvider } from './security/AuthContext'

import ProtectedRoute from './security/ProtectedRoute'


function App() {
  

  return (
    <div className="App">
      <AuthProvider>
      <Router>
        <Navbar/>
        <Routes>
          <Route exact path="/" element={<Home/>}></Route>
          <Route exact path="/favorites" element={<ProtectedRoute><Favorites/></ProtectedRoute>}></Route>
          <Route exact path="/compare" element={<ProtectedRoute><Compare/></ProtectedRoute>}></Route>
          <Route exact path="/viewprofile" element={<ProtectedRoute><ViewProfile/></ProtectedRoute>}></Route>
          <Route exact path="/addprofile" element={<AddProfile/>}></Route>
          <Route exact path="/editprofile/:id" element={<ProtectedRoute><EditProfile/></ProtectedRoute>}></Route>
          <Route exact path="/viewlanguage" element={<ProtectedRoute><ViewLanguage/></ProtectedRoute>}></Route>
          <Route exact path="/addlanguage" element={<ProtectedRoute><AddLanguage/></ProtectedRoute>}></Route>
          <Route exact path="/editlanguage" element={<ProtectedRoute><EditLanguage/></ProtectedRoute>}></Route>
          <Route exact path="/languages" element={<ProtectedRoute><MyLanguages/></ProtectedRoute>}></Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/callback" element={<CallbackPage/>} />
        </Routes>        
      </Router>      
      </AuthProvider>          
    
    </div>
  )
}

export default App
