import { useState } from "react";
import Form from "../../components/LoginForm/Form";
import Navbar from '../../components/Navbar/Navbar'
import Loading from '../../components/popups/Loading/Loading'

export default function Register() {
    const [nameValue,setNameValue] = useState('')
    const [emailValue,setEmailValue] = useState('')
    const [passwordValue,setPasswordValue] = useState('')

    const settings = {
        type: 'register',
        texts: {
            title: 'Hello, Register to play chess!',
            submiBtn: 'Register',
            switchText: 'Already have an Account?',
            switchLink: 'Login',
        }, 
        inputs: [
            {type: 'text', placeholder: 'ChessPro87',text: 'Username',value:nameValue,setValue:setNameValue},
            {type: 'email', placeholder: 'royal.chess@example.com', text: 'Email',value:emailValue,setValue:setEmailValue},
            {type: 'password', placeholder: 'abc123',text: 'Password',value:passwordValue,setValue:setPasswordValue},
        ],
        switchLink: '/login',
    }  

    return (
        <>
            <Navbar />
            <Form settings={settings}/>
        </>
    )
}

