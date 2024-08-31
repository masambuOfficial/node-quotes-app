/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function AuthorsPage({ user }) {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4500/authors")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setAuthors(response.data);
        } else {
          console.error("API did not return an array:", response.data);
          setAuthors([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching authors:", error);
        setAuthors([]);
      });
  }, []);

  const deleteAuthor = (id) => {
    axios.delete(`http://localhost:4500/authors/${id}`).then(() => {
      setAuthors(authors.filter((author) => author.id !== id));
    });
  };

  return (
    <div className="relative">
      <div className="fixed top-0 left-0 w-full bg-white z-10 shadow-md">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
          <h1 className="text-5xl font-bold text-gray-900">Authors</h1>
          {(user?.role === "editor" || user?.role === "superAdmin") && (
            <Link
              to="/authors/new"
              className="inline-block bg-blue-500 text-white py-2 px-4 rounded-sm font-semibold hover:bg-white hover:text-blue-500 hover:border hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Add New Author
            </Link>
          )}
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto my-24 px-4 sm:px-6 lg:px-8">
        <ul className="list-none divide-y divide-gray-200">
          {authors.map((author) => (
            <li
              key={author.id}
              className="p-4 border border-gray-300 rounded-sm mb-4 shadow-sm bg-white"
            >
              <p className="text-lg text-gray-800 mb-2">{author.name}</p>
              <p className="text-sm text-gray-600 mb-4">{author.bio}</p>
              <div className="flex gap-4">
                {(user?.role === "editor" || user?.role === "superAdmin") && (
                  <Link
                    to={`/authors/edit/${author.id}`}
                    className="bg-yellow-500 text-white px-4 py-1 rounded-sm hover:bg-white hover:text-yellow-500 hover:border hover:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
                  >
                    Edit
                  </Link>
                )}
                {user?.role === "superAdmin" && (
                  <button
                    onClick={() => deleteAuthor(author.id)}
                    className="bg-red-500 text-white px-4 py-1 rounded-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                  >
                    Delete
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AuthorsPage;
