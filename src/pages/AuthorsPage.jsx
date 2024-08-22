// src/pages/AuthorsPage.js
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function AuthorsPage() {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4500/authors")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setAuthors(response.data);
        } else {
          console.error("API did not return an array:", response.data);
          setAuthors([]); // Set to an empty array if the response is not as expected
        }
      })
      .catch((error) => {
        console.error("Error fetching authors:", error);
        setAuthors([]); // Set to an empty array in case of error
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
          <Link
            to="/authors/new"
            className="inline-block bg-blue-500 text-white py-2 px-4 rounded-sm font-semibold hover:bg-white hover:text-blue-500 hover:border hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Create New Author
          </Link>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto mt-24 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {authors.length > 0 ? (
            authors.map((author) => (
              <div
                key={author.id}
                className="p-4 border border-gray-300 rounded-sm shadow-sm bg-white flex flex-col items-center"
              >
                {author.picture && (
                  <img
                    src={author.picture}
                    alt={`${author.name}'s picture`}
                    className="w-full h-48 rounded-sm object-cover mb-4"
                  />
                )}
                <p className="text-lg text-gray-800 font-semibold mb-2">
                  {author.name}
                </p>
                <div className="flex gap-2 mt-auto">
                  <Link
                    to={`/authors/edit/${author.id}`}
                    className="bg-yellow-500 text-white px-4 py-1 rounded-sm hover:bg-white hover:text-yellow-500 hover:border hover:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteAuthor(author.id)}
                    className="bg-red-500 text-white px-4 py-1 rounded-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No authors available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthorsPage;
