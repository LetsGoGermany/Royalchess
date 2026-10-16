import Loading from '../popups/Loading/Loading'
import { useState } from 'react'
import './Form.css'

export default function Form({ settings }) {

    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(false)


    function getFormDate() {
        const formData = {}
        settings.inputs.forEach((input) => {
            formData[input.text.toLowerCase()] = input.value
        })
        return formData
    }

    function onSubmit(e) {
        e.preventDefault()
        setLoading(true)
        const formData = getFormDate()

        fetch(`http://192.168.2.115:1844/auth/${settings.type}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(formData)
        }
        )
        .catch(err => handleError(err))
        .then(res => res.json())
        .then(data => handleResponse(data))
        .finally(setLoading(false))
    }

    function handleResponse(data) {
        if(data.success) return window.location.href = '/'
        setError(data.message)
    }

    function handleError(err) {
        setError(err.message)
    }

    return (
        <main className="login-page">
            <section className="login-container"> <div className="login-logo">
                <span className="login-logo-icon">
                    <img src="/nav-icons/logo.png" />
                </span>
                <span className='login-title royalchess'>ROYALCHESS</span>
            </div>
                <div className="login-heading">
                    {<h1>{settings.texts.title}</h1>}
                </div>
                <form className={`login-form`} onSubmit={onSubmit}>

                    {settings.inputs.map((input, index) => <FormInputSection
                        key={index}
                        input={input}
                    />
                    )}

                    <button
                        className='login-submit'
                        type="submit"
                    >{settings.texts.submiBtn}</button>

                </form>
                <p className="login-register">
                    {settings.texts.switchText}
                    <a href={settings.switchLink}>{settings.texts.switchLink}</a>
                </p>
                <p className='error-box'>{error}</p>
            </section>
        {loading && <Loading />}
        </main>
    )
}

function FormInputSection({ input }) {
    return (
        <div className='login-input-group'>
            <label htmlFor={input.text}>{input.text}</label>
            {input.type === 'password' ? <PasswordInput input={input} /> : <FormInput input={input} />}
        </div>
    )
}

function FormInput({ input }) {
    return <input
        type={input.type}
        placeholder={input.placeholder}
        value={input.value}
        onChange={(event) => input.setValue(event.target.value)}
        id={input.text}
        required
    />
}

function PasswordInput({ input }) {

    return (
        <div className="login-password-wrapper">
            <FormInput input={input} />

            <button
                type="button"
                className="login-toggle-password"
                id="togglePassword"
                aria-label="Passwort anzeigen"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="19"
                    height="19"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                </svg>
            </button>
        </div>
    )
}