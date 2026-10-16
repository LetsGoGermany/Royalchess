import { useState } from "react";
import Form from "../../components/LoginForm/Form";
import Navbar from '../../components/Navbar/Navbar'

export default function Login() {
    const [emailValue,setEmailValue] = useState('')
    const [passwordValue,setPasswordValue] = useState('')

    const settings = {
        type: 'login',
        texts: {
            title: 'Welcome Back!',
            submiBtn: 'Login',
            switchText: 'Don\'t have an Account Yet?',
            switchLink: 'Sign Up',
        },
        inputs: [
            {type: 'email', placeholder: 'royal.chess@example.com', text: 'Email',value:emailValue,setValue:setEmailValue},
            {type: 'password', placeholder: 'abc123',text: 'Password',value:passwordValue,setValue:setPasswordValue},
        ], 
        switchLink: '/register'
    } 
    return (
        <>
            <Navbar />
            <Form settings={settings}/>
        </>
    )
}