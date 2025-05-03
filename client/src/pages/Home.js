import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../redux/actions/bookActions';
import { createBook } from '../services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialFormState = {
  title: '',
  author: '',
  description: '',
  coverImage: '',
};

const Home = () => {
  const dispatch = useDispatch();
  const { books, loading, error } = useSelector((state) => state.books);
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createBook(formData);
      toast.success('Book added successfully!');
      setFormData(initialFormState);
      dispatch(fetchBooks());
    } catch (err) {
      toast.error(`Failed to add book: ${err.response?.data?.message || err.message}`);
    }
  };

  const renderBookForm = () => (
    <div className="bg-white p-6 rounded-xl shadow-lg mb-10">
      <h2 className="text-2xl font-bold text-[#00635D] mb-4">Add a New Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#00635D]"
          required
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#00635D]"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#00635D]"
        />
        <input
          type="text"
          name="coverImage"
          placeholder="Cover Image URL"
          value={formData.coverImage}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#00635D]"
        />
        <button
          type="submit"
          className="bg-[#00635D] text-white font-semibold py-3 px-6 rounded hover:bg-[#004d47] transition"
        >
          Add Book
        </button>
      </form>
    </div>
  );

  const renderBooks = () => {
    if (loading) return <p className="text-gray-500">Loading books...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;
    if (books.length === 0) return <p className="text-gray-500">No books available.</p>;

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <div key={book._id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
            {book.coverImage && (
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-full h-48 object-cover rounded mb-3"
              />
            )}
            <a href={`/books/${book._id}`} className="text-[#1E7B9F] text-lg font-bold hover:underline">
              {book.title}
            </a>
            <p className="text-sm text-gray-600">by {book.author}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#333] mb-8">Featured Books</h1>

      {isAuthenticated && user?.role === 'admin' && renderBookForm()}
      {renderBooks()}

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default Home;
