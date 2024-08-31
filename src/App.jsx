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

  return (
    <Router>
      <Routes>
        {/* This route will render the QuotesPage without any buttons */}
        <Route
          path="/"
          element={<QuotesPage user={null} />}  // Pass null to hide buttons
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        
        {/* Quotes page with user context (with buttons based on role) */}
        <Route 
          path="/quotes" 
          element={<QuotesPage user={user} />} 
        />
        
        {/* Additional routes for authors, forms, and admin pages */}
        <Route path="/authors" element={user?.role === 'editor' || user?.role === 'superAdmin' ? <AuthorsPage user={user} /> : <Navigate to="/" />} />
        <Route path="/quotes/new" element={user?.role === 'editor' || user?.role === 'superAdmin' ? <QuoteForm /> : <Navigate to="/" />} />
        <Route path="/quotes/edit/:id" element={user?.role === 'editor' || user?.role === 'superAdmin' ? <QuoteForm /> : <Navigate to="/" />} />
        <Route path="/authors/new" element={user?.role === 'editor' || user?.role === 'superAdmin' ? <AuthorForm /> : <Navigate to="/" />} />
        <Route path="/authors/edit/:id" element={user?.role === 'editor' || user?.role === 'superAdmin' ? <AuthorForm /> : <Navigate to="/" />} />
        <Route path="/users" element={user?.role === 'superAdmin' ? <UserList /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
