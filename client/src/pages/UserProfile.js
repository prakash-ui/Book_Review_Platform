import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { fetchUser, updateUser } from '../services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserProfile = () => {
  const { id } = useParams();
  const { user: currentUser, isAuthenticated } = useSelector((state) => state.auth);

  const [profile, setProfile] = useState(null);
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user profile
  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      try {
        const { data } = await fetchUser(id);
        setProfile(data);
        setBio(data.bio || '');
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, [id]);

  // Update bio
  const handleUpdateBio = async (e) => {
    e.preventDefault();
    try {
      await updateUser(id, { bio });
      setProfile((prev) => ({ ...prev, bio }));
      toast.success('Bio updated successfully!');
    } catch (err) {
      toast.error('Failed to update bio: ' + (err.response?.data?.message || err.message));
    }
  };

  // Loading and error handling
  if (loading) return <p className="text-center text-gray-500">Loading profile...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[#333] mb-6">{profile.username}'s Profile</h1>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="mb-4">
          <p className="text-gray-600"><strong>Email:</strong> {profile.email}</p>
          <p className="text-gray-700 mt-2">
            <strong>Bio:</strong> {profile.bio ? profile.bio : 'No bio added yet.'}
          </p>
        </div>

        {isAuthenticated && currentUser?._id === id && (
          <form onSubmit={handleUpdateBio} className="space-y-4 mt-4">
            <label htmlFor="bio" className="block font-medium text-gray-700">Update Bio</label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Write your bio..."
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00635D]"
              rows={4}
            />
            <button
              type="submit"
              className="bg-[#00635D] text-white font-semibold px-6 py-2 rounded hover:bg-[#004d47] transition"
            >
              Save Changes
            </button>
          </form>
        )}
      </div>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default UserProfile;
