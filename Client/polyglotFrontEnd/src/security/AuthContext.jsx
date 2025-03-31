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

    const [loggedInUserId, setloggedInUserId] = useState(() => {
        return localStorage.getItem('loggedInUserId') 
    })

    const login = (username,userid) => {
        //console.log(loggedInUser)
        setIsAuthenticated(true)
        localStorage.setItem('isAuthenticated', true)
        setloggedInUser(username)
        localStorage.setItem('loggedInUser', username)
        setloggedInUserId(userid)
        localStorage.setItem('loggedInUserId', userid)        
        console.log(loggedInUserId)
    }

    const logout = () => {
        setIsAuthenticated(false)
        localStorage.removeItem('isAuthenticated')
    }

    return (
        <AuthContext.Provider value={{isAuthenticated, login, logout, loggedInUser,loggedInUserId}}>
            {children}
        </AuthContext.Provider>
    )

}