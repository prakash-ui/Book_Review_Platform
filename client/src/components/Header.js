import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/actions/authActions';

const Header = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(logoutUser());
    navigate('/auth');
  };

  return (
    <header className="bg-white shadow-md p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-[#00635D]">
          BookReviews
        </Link>
        <nav className="space-x-6">
          <Link to="/" className="text-[#1E7B9F] hover:underline">
            Home
          </Link>
          <Link to="/books" className="text-[#1E7B9F] hover:underline">
            Books
          </Link>
          {isAuthenticated && (
            <Link to={`/users/${user?._id}`} className="text-[#1E7B9F] hover:underline">
              Profile
            </Link>
          )}
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="text-[#1E7B9F] hover:underline"
            >
              Logout
            </button>
          ) : (
            <Link to="/auth" className="text-[#1E7B9F] hover:underline">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;