import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser } from '../redux/actions/authActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });

  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.auth);

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
// Set default admin credentials when switching to login view
useEffect(() => {
  if (isLogin) {
    setFormData({
      username: '',
      email: 'admin123@gmail.com', // Default admin email
      password: 'admin', // Default admin password
    });
  } else {
    setFormData({ username: '', email: '', password: '' });
  }
}, [isLogin]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, password } = formData;

    if (!email || !password || (!isLogin && !username)) {
      toast.error('Please fill out all required fields.');
      return;
    }

    isLogin
      ? dispatch(loginUser({ email, password }))
      : dispatch(registerUser({ username, email, password }));
  };

  useEffect(() => {
    if (error) toast.error(error);
    if (success) {
      toast.success(isLogin ? 'Logged in successfully!' : 'Account created successfully!');
    }
  }, [error, success, isLogin]);

  return (
    <div className="container mx-auto p-6 flex items-center justify-center min-h-[calc(100vh-120px)]">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-[#00635D] mb-6 text-center">
          {isLogin ? 'Sign In' : 'Sign Up'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00635D]"
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00635D]"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00635D]"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#00635D] text-white font-semibold py-3 rounded-lg hover:bg-[#004d47] transition disabled:bg-gray-400"
          >
            {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-[#1E7B9F] font-semibold hover:underline"
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </div>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default Auth;
