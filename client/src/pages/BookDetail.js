import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBook } from '../redux/actions/bookActions';
import { fetchReviews, createReview } from '../services/api';
import { ToastContainer, toast } from 'react-toastify';

const BookDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { book, loading, error } = useSelector((state) => state.books);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    dispatch(fetchBook(id));
    fetchReviews(id)
      .then((res) => setReviews(res.data))
      .catch((err) => console.error('Fetch reviews error:', err));
  }, [dispatch, id]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error('Please log in to submit a review.');
      return;
    }
    try {
      await createReview({ bookId: id, userId: user?._id, rating, comment });
      const updatedReviews = await fetchReviews(id);
      setReviews(updatedReviews.data);
      setRating(0);
      setComment('');
      toast.success('Review submitted!');
    } catch (err) {
      toast.error('Failed to submit review: ' + (err.response?.data?.message || err.message));
    }
  };

  if (loading) return <p className="text-gray-500 text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">Error: {error}</p>;

  return (
    <div className="container mx-auto p-6 flex flex-col lg:flex-row gap-6">
      <div className="lg:w-1/3 bg-white p-6 rounded shadow-md">
        <img
          src={book.coverImage || 'https://via.placeholder.com/300x400?text=No+Image'}
          alt={book.title}
          className="w-full h-64 object-cover rounded mb-4"
          onError={(e) => (e.target.src = 'https://via.placeholder.com/300x400?text=Image+Unavailable')}
        />
        <h1 className="text-2xl font-semibold text-[#333] mb-2">{book.title}</h1>
        <p className="text-gray-600 mb-2">by {book.author}</p>
        <p className="text-gray-700 whitespace-pre-line">{book.description}</p>
      </div>

      <div className="lg:w-2/3">
        <h2 className="text-xl font-semibold text-[#00635D] mb-4">Community Reviews</h2>

        {isAuthenticated ? (
          <form onSubmit={handleSubmitReview} className="bg-white p-6 rounded shadow-md mb-6">
            <h3 className="text-lg font-semibold mb-2">Write a Review</h3>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Rating (1-5):</label>
              <input
                type="number"
                min="1"
                max="5"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-20 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#00635D]"
                required
              />
            </div>
            <textarea
              placeholder="Your review..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#00635D]"
              required
            />
            <button
              type="submit"
              className="bg-[#00635D] text-white px-4 py-2 rounded hover:bg-[#004d47]"
            >
              Submit Review
            </button>
          </form>
        ) : (
          <p className="text-gray-600">Please log in to submit a review.</p>
        )}

        <div className="space-y-4">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review._id} className="bg-white p-4 rounded shadow-md">
                <p className="text-gray-600 font-semibold">Rating: {review.rating}/5</p>
                <p className="text-gray-700">{review.comment}</p>
                <p className="text-sm text-gray-500">By {review.userId?.username || 'Anonymous'}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No reviews yet.</p>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default BookDetail;
