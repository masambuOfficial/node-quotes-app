// src/components/AuthorForm.js
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function AuthorForm() {
  const [name, setName] = useState('');
  const [picture, setPicture] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:4500/authors/${id}`).then((response) => {
        const author = response.data;
        setName(author.name);
        setPicture(author.picture);
      });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { name, picture };

    if (id) {
      axios.put(`http://localhost:4500/authors/${id}`, data).then(() => navigate('/authors'));
    } else {
      axios.post('http://localhost:4500/authors', data).then(() => navigate('/authors'));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Author Name" required />
      <input value={picture} onChange={(e) => setPicture(e.target.value)} placeholder="Picture URL" />
      <button type="submit">Save</button>
    </form>
  );
}

export default AuthorForm;
