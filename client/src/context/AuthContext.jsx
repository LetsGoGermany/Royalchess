import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        fetch('http://192.168.2.115:1844/auth', {
            credentials: 'include',
        })
            .then(data => data.json())
            .then(res => setUser(res))
            .catch(err => setError('Error: ' + err.message))
            .finally(() => setLoading(false))
    }, [])

    return <AuthContext.Provider value={{ user, loading, error }}>
        {children}
    </AuthContext.Provider>
}