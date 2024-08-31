import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState } from 'react';
import QuotesPage from './pages/QuotesPage';
import AuthorsPage from './pages/AuthorsPage';
import QuoteForm from './components/QuoteForm';
import AuthorForm from './components/AuthorForm';
import UserList from './components/UserList';
import SignUp from './components/SignUp';
import Login from './components/Login';

function App() {
  const [user, setUser] = useState(null); // State to store the logged-in user

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
  };

  const getRedirectPath = () => {
    if (!user) return '/login'; // Redirect to login if not logged in
    if (user.role === 'SUBSCRIBER') return '/';
    if (user.role === 'EDITOR') return '/authors';
    return '/'; // Default to quotes page
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={!user ? <Navigate to="/signup" /> : <QuotesPage user={user} />}
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/authors" element={user?.role === 'EDITOR' ? <AuthorsPage user={user} /> : <Navigate to="/" />} />
        <Route path="/quotes/new" element={user?.role === 'EDITOR' ? <QuoteForm /> : <Navigate to="/" />} />
        <Route path="/quotes/edit/:id" element={user?.role === 'EDITOR' ? <QuoteForm /> : <Navigate to="/" />} />
        <Route path="/authors/new" element={user?.role === 'EDITOR' ? <AuthorForm /> : <Navigate to="/" />} />
        <Route path="/authors/edit/:id" element={user?.role === 'EDITOR' ? <AuthorForm /> : <Navigate to="/" />} />
        <Route path="/users" element={<UserList />} />
      </Routes>
    </Router>
  );
}

export default App;
