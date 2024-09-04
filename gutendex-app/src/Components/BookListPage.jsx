import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

const BookListPage = () => {
  const { genre } = useParams();
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  const fetchBooks = async () => {
    const response = await axios.get(
      `http://skunkworks.ignitesol.com:8000/books`,
      {
        params: {
          topic: genre,
          mime_type: 'image',
          search,
          page,
        },
      }
    );
    setBooks((prevBooks) => [...prevBooks, ...response.data.results]);
    setHasMore(Boolean(response.data.next));
  };

  useEffect(() => {
    fetchBooks();
  }, [genre, search, page]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setBooks([]); // reset books list on search
    setPage(1);   // reset page number
  };

  const handleBookClick = (book) => {
    const htmlFormat = book.formats['text/html'];
    const pdfFormat = book.formats['application/pdf'];
    const txtFormat = book.formats['text/plain'];

    if (htmlFormat) {
      window.open(htmlFormat, '_blank');
    } else if (pdfFormat) {
      window.open(pdfFormat, '_blank');
    } else if (txtFormat) {
      window.open(txtFormat, '_blank');
    } else {
      alert('No viewable version available');
    }
  };

  return (
    <div className="container mt-4">
      {/* Back Button and Genre Title */}
      <div className="row mb-3 align-items-center">
        <div className="col-12 d-flex align-items-center">
          <button className="btn p-0" onClick={() => navigate(-1)}>
            <i className="bi bi-arrow-left fs-4 text-primary"></i>
          </button>
          <h2 className="ms-3 text-primary">{genre.charAt(0).toUpperCase() + genre.slice(1)}</h2>
        </div>
      </div>

      {/* Search Bar */}
      <div className="row mb-3">
        <div className="col-12 col-md-6 mx-auto">
          <div className="input-group shadow-sm">
            <span className="input-group-text bg-light border-0">
              <i className="bi bi-search text-muted"></i>
            </span>
            <input
              type="text"
              className="form-control border-0 bg-light"
              placeholder="Search"
              value={search}
              onChange={handleSearchChange}
              style={{ borderRadius: '12px' }}
            />
          </div>
        </div>
      </div>

      {/* Infinite Scroll for Books */}
      <InfiniteScroll
        dataLength={books.length}
        next={() => setPage(page + 1)}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        <div className="row">
          {books.map((book) => (
            <div key={book.id} className="col-6 col-md-4 col-lg-3 mb-4">
              <div className="card h-100" onClick={() => handleBookClick(book)}>
                <img
                  src={book.formats['image/jpeg']}
                  className="card-img-top"
                  alt={book.title}
                  style={{ height: '250px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title" style={{ fontSize: '16px' }}>
                    {book.title}
                  </h5>
                  <p className="card-text text-muted" style={{ fontSize: '14px' }}>
                    {book.authors.map((author) => author.name).join(', ')}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default BookListPage;
