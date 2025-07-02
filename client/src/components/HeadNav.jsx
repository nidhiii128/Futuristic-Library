import React from 'react';
import { Book, Search, User, Upload } from 'lucide-react';

const HeadNav = ({ 
  currentUser, 
  setCurrentView, 
  setShowSignUp, 
  setShowUpload,
  searchTerm,
  setSearchTerm,
  selectedGenre,
  setSelectedGenre,
  genres,
  showSearch = false,
  title = "FutureLibrary",
  logout  // ✅ Added logout
}) => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b border-gray-800 bg-black backdrop-blur-sm">

      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <button
          onClick={() => setCurrentView('landing')}
          className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
        >
          <Book size={24} />
          <span className="font-semibold">{title}</span>
        </button>
        
        {showSearch && (
          <div className="flex items-center space-x-4 max-w-md flex-1 mx-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search books, authors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-white focus:border-blue-500 focus:outline-none"
              />
            </div>
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
            >
              <option value="all">All Genres</option>
              {genres.map(genre => (
                <option key={genre.id} value={genre.id}>{genre.name}</option>
              ))}
            </select>
          </div>
        )}

        <div className="flex items-center space-x-4">
          {currentUser ? (
            <>
              <button
                onClick={() => setCurrentView('dashboard')}
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
              >
                <User size={20} />
                <span>{currentUser.name}</span>
              </button>
              <button
                onClick={() => setShowUpload(true)}
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-all"
              >
                <Upload size={18} />
                <span>Upload{showSearch ? '' : ' Book'}</span>
              </button>
              {/* ✅ Logout button */}
              <button
                onClick={logout}
                className="text-red-400 hover:text-red-500 transition-colors ml-2 underline"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => setShowSignUp(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg transition-all"
            >
              Sign Up
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeadNav;
