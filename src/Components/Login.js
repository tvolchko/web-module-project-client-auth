import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import axiosWithAuth from "../util/axiosWithAuth";

const initialState = {
    username: 'Bloom',
    password: 'Tech'
}

const Login = (props) => {
    const [ form, setForm ]  = useState(initialState)
    const { push } = useHistory()


    const handleChange = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = e => {
        e.preventDefault()
        axios.post('http://localhost:9000/api/login', form)
            .then(resp => {
                props.setToken(resp.data.token)
                localStorage.setItem('token', resp.data.token)
                push('/friends')
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div>
            <h1>LOGIN</h1>
            <form>
                <input 
                    type={'text'} 
                    placeholder={'User Name'}
                    value={form.username}
                    onChange={handleChange}
                    name="username"
                ></input>
                <br/>
                <input 
                    type={'password'} 
                    placeholder={'Password'}
                    value={form.password}
                    onChange={handleChange}
                    name="password"
                ></input>
                <button onClick={handleSubmit}>Submit</button>
                
            </form>
        </div>
    )

}

export default Login