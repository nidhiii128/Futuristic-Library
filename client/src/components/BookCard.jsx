import React from 'react';
import { Book, Star, Eye } from 'lucide-react';

const BookCard = ({ book, onClick, genres, setUserHistory }) => {
  const genre = genres.find(g => g.id === book.genre);
  
  const handleRead = () => {
    const historyEntry = {
      bookId: book.id,
      title: book.title,
      genre: book.genre,
      timestamp: new Date().toISOString(),
      action: 'read'
    };
    setUserHistory(prev => [historyEntry, ...prev]);
    onClick && onClick(book);
  };

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 hover:border-gray-600 transition-all group">
      <div className="aspect-[3/4] bg-gray-700 rounded-lg mb-4 overflow-hidden">
        {book.image ? (
          <img src={book.image} alt={book.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Book size={48} className="text-gray-500" />
          </div>
        )}
      </div>
      <h3 className="font-semibold text-white mb-1 group-hover:text-blue-300 transition-colors">
        {book.title}
      </h3>
      <p className="text-gray-400 text-sm mb-2">by {book.author}</p>
      {genre && (
        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs bg-gradient-to-r ${genre.color} text-white mb-2`}>
          <genre.icon size={12} className="mr-1" />
          {genre.name}
        </div>
      )}
      <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
        <div className="flex items-center">
          <Star size={12} className="mr-1 text-yellow-400" />
          {book.rating || 'New'}
        </div>
        <div className="flex items-center">
          <Eye size={12} className="mr-1" />
          {book.views}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-green-400 font-semibold">${book.price}</span>
        <button
          onClick={handleRead}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-xs transition-colors"
        >
          Read
        </button>
      </div>
    </div>
  );
};

export default BookCard;