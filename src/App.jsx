// src/App.js
// import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuotesPage from './pages/QuotesPage';
import AuthorsPage from './pages/AuthorsPage';
import QuoteForm from './components/QuoteForm';
import AuthorForm from './components/AuthorForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QuotesPage />} />
        <Route path="/authors" element={<AuthorsPage />} />
        <Route path="/quotes/new" element={<QuoteForm />} />
        <Route path="/quotes/edit/:id" element={<QuoteForm />} />
        <Route path="/authors/new" element={<AuthorForm />} />
        <Route path="/authors/edit/:id" element={<AuthorForm />} />
      </Routes>
    </Router>
  );
}

export default App;
