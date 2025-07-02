import React, { useEffect, useState } from 'react';
import { BookOpen, User, History, Book } from 'lucide-react';
import BookCard from './BookCard';
import LogoutButton from '../components/LogoutButton';

const Dashboard = ({ navigate }) => {
  const [userHistory, setUserHistory] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [genres, setGenres] = useState([]);

  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!currentUser) return;

      try {
        const res = await fetch(`http://localhost:5000/api/user/${currentUser.email}`);
        const data = await res.json();

        setUserHistory(data.history || []);
        setRecommendations(data.recommendations || []);
        setGenres(data.genres || []);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };

    fetchDashboardData();
  }, [currentUser]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white px-6 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-3 text-xl font-semibold">
          <User className="text-blue-400" />
          Welcome, {currentUser?.email}
        </div>
        <LogoutButton />
      </div>

      {/* Recommendations */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
          <BookOpen className="text-green-400" />
          Recommended for You
        </h2>
        {recommendations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {recommendations.map((book, idx) => (
              <BookCard key={idx} book={book} />
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No recommendations yet.</p>
        )}
      </div>

      {/* User History */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
          <History className="text-yellow-400" />
          Your Reading History
        </h2>
        {userHistory.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {userHistory.map((book, idx) => (
              <BookCard key={idx} book={book} />
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No history available.</p>
        )}
      </div>

      {/* Browse by Genre */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
          <Book className="text-purple-400" />
          Browse by Genre
        </h2>
        {genres.length > 0 ? (
          <div className="flex flex-wrap gap-3">
            {genres.map((genre, idx) => (
              <button
                key={idx}
                className="bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-full transition"
                onClick={() => navigate(`/explore?genre=${encodeURIComponent(genre)}`)}
              >
                {genre}
              </button>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No genres found.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
