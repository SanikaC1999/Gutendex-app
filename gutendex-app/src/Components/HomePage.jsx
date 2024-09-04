import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const genres = [
    { name: 'Fiction', icon: 'bi bi-funnel' },
    { name: 'Drama', icon: 'bi bi-emoji-smile-upside-down-fill' },
    { name: 'Humor', icon: 'bi bi-emoji-smile' },
    { name: 'Politics', icon: 'bi bi-person-raised-hand' },
  ];

  const navigate = useNavigate();

  const handleGenreClick = (genre) => {
    navigate(`/books/${genre}`);
  };

  return (
    <div className="container mt-5">
      {/* Header Section */}
      <h1 className="display-4 text-primary">Gutenberg Project</h1>
      <p className="lead">
        A social cataloging website that allows you to freely search its database of books, annotations, and reviews.
      </p>

      {/* Genre Buttons */}
      <div className="row mt-4">
        {genres.map((genre) => (
          <div key={genre.name} className="col-12 mb-3">
            <button
              className="btn btn-light d-flex justify-content-between align-items-center w-100 shadow-sm p-3"
              onClick={() => handleGenreClick(genre.name.toLowerCase())}
              style={{ borderRadius: '12px' }}
            >
              <div className="d-flex align-items-center">
                <i className={`${genre.icon} text-primary fs-3 me-3`}></i>
                <span className="fs-5">{genre.name}</span>
              </div>
              <i className="bi bi-arrow-right fs-3 text-primary"></i>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
