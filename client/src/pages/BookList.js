import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../redux/actions/bookActions';
import { Link } from 'react-router-dom';
import defaultCover from '../assets/default-cover.jpg'; // fallback image



const BookList = () => {
  const dispatch = useDispatch();
  const { books, loading, error } = useSelector((state) => state.books);
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const filteredBooks = books?.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase()) ||
    book.author.toLowerCase().includes(search.toLowerCase())
  );

  const isValidImageUrl = (url) => {
    try {
      new URL(url);
      return /\.(jpeg|jpg|gif|png|webp)$/i.test(url);
    } catch (e) {
      return false;
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold text-[#333] mb-6">Browse Books</h1>

      <input
        type="text"
        placeholder="Search by title or author..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-md p-2 border rounded mb-6 focus:outline-none focus:ring-2 focus:ring-[#00635D]"
      />

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : filteredBooks.length === 0 ? (
        <p className="text-gray-500">No books found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <div
              key={book._id}
              className="bg-white p-4 rounded shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <img
                src={isValidImageUrl(book.coverImage) ? book.coverImage : defaultCover}
                alt={book.title}
                onError={(e) => (e.target.src = defaultCover)}
                className="w-full h-48 object-cover rounded mb-3"
              />
              <Link
                to={`/books/${book._id}`}
                className="text-[#1E7B9F] font-semibold hover:underline block"
              >
                {book.title}
              </Link>
              <p className="text-gray-600">by {book.author}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookList;
