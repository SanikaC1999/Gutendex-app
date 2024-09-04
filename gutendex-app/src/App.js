import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Components/HomePage';
import BookListPage from './Components/BookListPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/books/:genre" element={<BookListPage />} />
      </Routes>
    </Router>
  );
}

export default App;
