import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function QuotesPage() {
  const [quotes, setQuotes] = useState([]);
  const [authors, setAuthors] = useState({});
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Fetch user from localStorage and set quotes and authors
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    axios
      .get("http://localhost:4500/quotes")
      .then((response) => {
        const quotesData = response.data;
        setQuotes(quotesData);

        const authorIds = [...new Set(quotesData.map((quote) => quote.authorId))];
        authorIds.forEach((authorId) => {
          axios
            .get(`http://localhost:4500/authors/${authorId}`)
            .then((response) => {
              setAuthors((prevAuthors) => ({
                ...prevAuthors,
                [authorId]: response.data,
              }));
            })
            .catch((error) => {
              console.error("Error fetching author:", error);
            });
        });
      })
      .catch((error) => {
        console.error("Error fetching quotes:", error);
      });
  }, []);

  // Delete a quote
  const deleteQuote = (id) => {
    axios
      .delete(`http://localhost:4500/quotes/${id}`)
      .then(() => {
        setQuotes(quotes.filter((quote) => quote.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting quote:", error);
      });
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/quotes");
  };

  return (
    <div className="relative">
      <div className="fixed top-0 left-0 w-full bg-white z-10 shadow-md">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
          <h1 className="text-5xl font-bold text-gray-900">Quotes</h1>
          {!user ? (
            <Link
              to="/signup"
              className="inline-block bg-blue-500 text-white py-2 px-4 rounded-sm font-semibold hover:bg-white hover:text-blue-500 hover:border hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Sign Up
            </Link>
          ) : (
            <div className="flex gap-4">
              {(user.role === "editor" || user.role === "superAdmin") && (
                <>
                  <Link
                    to="/quotes/new"
                    className="inline-block bg-blue-500 text-white py-2 px-4 rounded-sm font-semibold hover:bg-white hover:text-blue-500 hover:border hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  >
                    Create New Quote
                  </Link>
                  <Link
                    to="/authors/new"
                    className="inline-block bg-blue-500 text-white py-2 px-4 rounded-sm font-semibold hover:bg-white hover:text-blue-500 hover:border hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  >
                    New Author
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="inline-block bg-red-500 text-white py-2 px-4 rounded-sm font-semibold hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto my-24 px-4 sm:px-6 lg:px-8">
        <ul className="list-none divide-y divide-gray-200">
          {quotes.length > 0 ? (
            quotes.map((quote) => (
              <li
                key={quote.id}
                className="p-4 border border-gray-300 rounded-sm mb-4 shadow-sm bg-white"
              >
                <p className="text-lg text-gray-800 mb-2">{quote.text}</p>
                <p className="text-sm text-gray-600 mb-4">
                  <span className="font-bold">Author:</span>{" "}
                  {authors[quote.authorId]
                    ? authors[quote.authorId].name
                    : "Unknown Author"}
                </p>
                <div className="flex gap-4">
                  {(user?.role === "editor" || user?.role === "superAdmin") && (
                    <Link
                      to={`/quotes/edit/${quote.id}`}
                      className="bg-yellow-500 text-white px-4 py-1 rounded-sm hover:bg-white hover:text-yellow-500 hover:border hover:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
                    >
                      Edit
                    </Link>
                  )}
                  {user?.role === "superAdmin" && (
                    <button
                      onClick={() => deleteQuote(quote.id)}
                      className="bg-red-500 text-white px-4 py-1 rounded-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </li>
            ))
          ) : (
            <p className="text-center text-gray-600">No quotes available.</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default QuotesPage;
