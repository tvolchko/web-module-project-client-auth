import React, { useState, useEffect } from "react";
import axiosWithAuth from "../util/axiosWithAuth";
import { useHistory } from "react-router-dom";

const initialForm = {
    name: '',
    age: '',
    email: ''
}

const AddFriend = (props) => {
    const [ form, setForm ] = useState(initialForm)
    const { push } = useHistory()
    const handleChange = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        axiosWithAuth().post('/friends', form)
            .then(resp => {
                console.log(props.friends)
                props.setFriends([...props.friends, resp.data])
                push('/friends')
            })
            .finally(() => {
                console.log(props.friends)
            })
        
    }


    return (
        <div>
            <form>
                <input
                    type={'text'}
                    value={form.name}
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                    />
                <input
                    type={'text'}
                    value={form.age}
                    name="age"
                    placeholder="age"
                    onChange={handleChange}
                    />
                <input
                    type={'text'}
                    value={form.email}
                    name="email"
                    placeholder="email"
                    onChange={handleChange}
                    />        
                <button onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default AddFriend