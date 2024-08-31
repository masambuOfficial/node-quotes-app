import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom"; // Import useParams

const QuoteForm = () => {
  const [text, setText] = useState("");
  const [year, setYear] = useState("");
  const [category, setCategory] = useState("");
  const [authors, setAuthors] = useState([]);
  const [authorId, setAuthorId] = useState("");
  const [newAuthorName, setNewAuthorName] = useState("");
  const [newAuthorPicture, setNewAuthorPicture] = useState("");
  const [isNewAuthor, setIsNewAuthor] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate(); // Initialize the useNavigate hook
  const { id } = useParams(); // Get the quote ID from the URL params

  // Generate years from 1900 to the current year
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1799 }, (_, i) => currentYear - i);

  // Fetch existing authors on component mount
  useEffect(() => {
    axios
      .get("http://localhost:4500/authors")
      .then((response) => {
        setAuthors(response.data);
      })
      .catch((error) => {
        console.error("Error fetching authors:", error);
        setErrorMessage("Failed to load authors.");
      });

    // If there's an id, fetch the existing quote data
    if (id) {
      axios
        .get(`http://localhost:4500/quotes/${id}`)
        .then((response) => {
          const quote = response.data;
          setText(quote.text);
          setYear(quote.year);
          setCategory(quote.category);
          setAuthorId(quote.authorId);
          if (quote.Author) {
            setNewAuthorName(quote.Author.name);
            setNewAuthorPicture(quote.Author.picture);
          }
        })
        .catch((error) => {
          console.error("Error fetching quote:", error);
          setErrorMessage("Failed to load quote data.");
        });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data for submission
    const data = {
      text,
      year: parseInt(year),
      category,
      name: isNewAuthor ? newAuthorName : undefined,
      picture: isNewAuthor ? newAuthorPicture : undefined,
      authorId: !isNewAuthor ? authorId : undefined,
    };

    try {
      let response;
      if (id) {
        // Update existing quote
        response = await axios.put(`http://localhost:4500/quotes/${id}`, data);
        if (response.status === 200) {
          console.log("Quote updated successfully:", response.data);
          navigate("/");
        } else {
          console.error("Unexpected status code:", response.status);
          setErrorMessage("Unexpected error occurred. Please try again.");
        }
      } else {
        // Create new quote
        response = await axios.post("http://localhost:4500/quotes", data);
        if (response.status === 201 || response.status === 200) {
          console.log("Quote created successfully:", response.data);
          navigate("/");
        } else {
          console.error("Unexpected status code:", response.status);
          setErrorMessage("Unexpected error occurred. Please try again.");
        }
      }
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response);
        setErrorMessage(
          `Error: ${error.response.status} - ${
            error.response.data.message || "An error occurred."
          }`
        );
      } else if (error.request) {
        console.error("No response received:", error.request);
        setErrorMessage(
          "No response from server. Please check your connection."
        );
      } else {
        console.error("Error:", error.message);
        setErrorMessage("An unexpected error occurred.");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md mt-20"
    >
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Quote Text:
        </label>
        <textarea
          className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:shadow-outline"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
          rows="4"
          placeholder="Enter the quote"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Year:
        </label>
        <select
          className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:shadow-outline"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
        >
          <option value="">Select a year</option>
          {years.map((yearOption) => (
            <option key={yearOption} value={yearOption}>
              {yearOption}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Category:
        </label>
        <input
          className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:shadow-outline"
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          placeholder="Enter the category"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Author:
        </label>
        <select
          className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:shadow-outline"
          value={isNewAuthor ? "new" : authorId}
          onChange={(e) => {
            if (e.target.value === "new") {
              setIsNewAuthor(true);
              setAuthorId("");
            } else {
              setIsNewAuthor(false);
              setAuthorId(e.target.value);
            }
          }}
        >
          <option value="">Select an author</option>
          {authors.map((author) => (
            <option key={author.id} value={author.id}>
              {author.name}
            </option>
          ))}
          <option value="new">Create a new author</option>
        </select>
      </div>
      {isNewAuthor && (
        <>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              New Author Name:
            </label>
            <input
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:shadow-outline"
              type="text"
              value={newAuthorName}
              onChange={(e) => setNewAuthorName(e.target.value)}
              required
              placeholder="Enter the new author's name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Author Picture URL:
            </label>
            <input
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:shadow-outline"
              type="url"
              value={newAuthorPicture}
              onChange={(e) => setNewAuthorPicture(e.target.value)}
              placeholder="Enter the picture URL"
            />
          </div>
        </>
      )}
      {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:shadow-outline"
      >
        {id ? "Update Quote" : "Create Quote"}
      </button>
    </form>
  );
};

export default QuoteForm;
