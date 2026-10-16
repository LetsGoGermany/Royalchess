import { useEffect, useState } from "react"
import "./Alert.css"

export default function Alert({ text, timeOnScreen }) {
    const [visible, setVisible] = useState(true) 
    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false)
        }, timeOnScreen * 1000)

        return () => clearTimeout(timer)
    }, [timeOnScreen])

    if (!visible) return null

    return (
        <div className="alert">
            <div className="alert-text">
                {text}
            </div>

            <div
                className="alert-progress"
                style={{
                    animationDuration: `${timeOnScreen}s`
                }}
            />
        </div>
    )
}