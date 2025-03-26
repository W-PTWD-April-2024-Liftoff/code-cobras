import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext)


export const AuthProvider = ({children}) => {

    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return localStorage.getItem('isAuthenticated') === 'true'
    })

    const [loggedInUser, setloggedInUser] = useState(() => {
        return localStorage.getItem('loggedInUser') 
    })

    const login = (username) => {
        //console.log(loggedInUser)
        setIsAuthenticated(true)
        localStorage.setItem('isAuthenticated', true)
        setloggedInUser(username)
        localStorage.setItem('loggedInUser', username)
        console.log(loggedInUser)
    }

    const logout = () => {
        setIsAuthenticated(false)
        localStorage.removeItem('isAuthenticated')
    }

    return (
        <AuthContext.Provider value={{isAuthenticated, login, logout, loggedInUser}}>
            {children}
        </AuthContext.Provider>
    )

}