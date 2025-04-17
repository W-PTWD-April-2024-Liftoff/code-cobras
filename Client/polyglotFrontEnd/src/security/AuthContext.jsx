import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext)


export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8080/me', {
          credentials: 'include', 
        })
          .then((res) => {
            if (!res.ok) throw new Error('Not authenticated');
            return res.json();
          })
          .then((data) => login(data.name, data.email))
          .catch(() => setUser(null));
      }, []);

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
        console.log(loggedInUser)
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