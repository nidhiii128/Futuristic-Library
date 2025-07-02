import React from 'react';
import { Book } from 'lucide-react';
import HeadNav from './HeadNav';
import BookCard from './BookCard';

const ExplorePage = ({ 
  currentUser,
  setShowSignUp,
  setShowUpload,
  books,
  searchTerm,
  setSearchTerm,
  selectedGenre,
  setSelectedGenre,
  genres,
  setUserHistory,
  navigate
}) => {
  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre === 'all' || book.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-500 via-black to-gray-500">
      <HeadNav
  currentUser={currentUser}
  setCurrentView={setCurrentView}
  setShowSignUp={setShowSignUp}
  setShowUpload={setShowUpload}
  searchTerm={searchTerm}
  setSearchTerm={setSearchTerm}
  selectedGenre={selectedGenre}
  setSelectedGenre={setSelectedGenre}
  genres={genres}
  showSearch={true}
  logout={logout}   // ✅ Add this line
/>


      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-white">
            {selectedGenre === 'all' ? 'All Books' : genres.find(g => g.id === selectedGenre)?.name || 'Books'}
          </h2>
          <span className="text-gray-400">{filteredBooks.length} books found</span>
        </div>

        {filteredBooks.length === 0 ? (
          <div className="text-center py-16">
            <Book size={64} className="mx-auto text-gray-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No books found</h3>
            <p className="text-gray-500">Try adjusting your search or browse different genres</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredBooks.map(book => (
              <BookCard 
                key={book.id} 
                book={book} 
                genres={genres}
                setUserHistory={setUserHistory}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExplorePage;