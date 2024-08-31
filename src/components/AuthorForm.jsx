// src/components/AuthorForm.js
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function AuthorForm() {
  const [name, setName] = useState("");
  const [picture, setPicture] = useState("");
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
      axios
        .put(`http://localhost:4500/authors/${id}`, data)
        .then(() => navigate("/authors"));
    } else {
      axios
        .post("http://localhost:4500/authors", data)
        .then(() => navigate("/authors"));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full p-6 bg-white rounded-lg shadow-md space-y-4"
      >
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Author Name
          </label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Author Name"
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="picture"
            className="block text-sm font-medium text-gray-700"
          >
            Picture URL
          </label>
          <input
            id="picture"
            value={picture}
            onChange={(e) => setPicture(e.target.value)}
            placeholder="Picture URL"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default AuthorForm;
