import React, { useEffect, useState } from 'react';
import './Main.css'
import logo from '../assets/tinder.svg'
import like from '../assets/like.svg'
import dislike from '../assets/dislike.svg'

import api from '../services/api'

export default function Main({ match }) {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get('/devs', {
        headers: { user: match.params.id }
      });

      setUsers(response.data)
    }

    loadUsers();
  }, [match.params.id])

  async function handleLike(id) {
    await api.post(`/devs/${id}/like`);
  }

  async function handledisLike(id) {
    await api.post(`/devs/${id}/dislike`, null, {
      headers: { user: match.params.id }
    });
  }

  return (
    <div className="main-container">
      <img src={logo} alt="Tindev"></img>

      <ul>
        {users.map(user => (
          <li key={user._id}>
            <img src={user.avatar} alt={user.name} />
            <footer>
              <strong>{user.name}</strong>
              <p>{user.bio}</p>
            </footer>

            <div className="buttons">
              <button type="button" onClick={() => handledisLike(user._id)}>
                <img src={dislike} alt="dislike" />
              </button>
              <button type="button" onClick={() => handleLike(user._id)}>
                <img src={like} alt="like" />
              </button>
            </div>

          </li>
        ))}
      </ul>
    </div>
  );
}