import { useEffect, useState } from "react";

export default function AuthProvider() {
    const [board,setBoard] = useState(null)
    const [loading,setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        fetch('http://192.168.2.115:1844/game/getBoard', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
        })
            .then(res => {
                if (!res.ok) throw new Error('Verbindung zum server konnte nicht hergestellt werden')
            })
            .then(res => res.json())
            .then(data => setBoard(data))
            .catch(err => setError('Error: ' + err.message))
            .finally(() => setLoading(false))
    }, [])

    return {
        board,
        loading,
        error
    }
}