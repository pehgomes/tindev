import React, { useState } from 'react'
import logo from '../assets/tinder.svg';
import './Login.css';

import api from '../services/api'

function Login({ history }) {

    const [username, setUsername] = useState('')

    async function handleSubmit(e) {
        e.preventDefault();
        const response = await api.post('/devs', {
            username,
        });

        const { _id } = response.data;
        console.log(response);
        history.push(`/main${_id}`)
    }

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <img src={logo} alt="Tindev"></img>
                <input
                    placeholder="Digite seu usuario no github"
                    value={username}
                    onChange={e => setUsername(e.target.value)} />
                <button type="submit" >Enviar </button>
            </form>
        </div>
    );
}

export default Login;