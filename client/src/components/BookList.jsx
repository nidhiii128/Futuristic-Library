import React, { useState, useEffect } from 'react';
import { BookOpen, Star, DollarSign, ShoppingCart, Eye, Search, Filter, Grid, List } from 'lucide-react';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');
  const [loading, setLoading] = useState(true);

  // Sample data - replace with actual API call
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const sampleBooks = [
        {
          id: 1,
          title: "The Future of AI",
          author: "Dr. Sarah Chen",
          description: "An in-depth exploration of artificial intelligence and its impact on society, covering machine learning, neural networks, and ethical considerations.",
          genre: "Technology",
          price: 29.99,
          rating: 4.5,
          coverImage: "/api/placeholder/200/300",
          publishedDate: "2024-03-15",
          pages: 352,
          tags: ["AI", "Technology", "Future"],
          uploadedBy: "user123",
          uploadedAt: "2024-03-20T10:00:00Z"
        },
        {
          id: 2,
          title: "Mystery of the Ancient Code",
          author: "Michael Rodriguez",
          description: "A thrilling mystery novel that combines ancient history with modern cryptography. Follow detective Emma as she unravels secrets from the past.",
          genre: "Mystery",
          price: 19.99,
          rating: 4.2,
          coverImage: "/api/placeholder/200/300",
          publishedDate: "2024-02-10",
          pages: 288,
          tags: ["Mystery", "Thriller", "History"],
          uploadedBy: "user456",
          uploadedAt: "2024-02-15T14:30:00Z"
        },
        {
          id: 3,
          title: "Building Better Habits",
          author: "Lisa Johnson",
          description: "A practical guide to forming positive habits and breaking negative ones. Based on scientific research and real-world applications.",
          genre: "Self-Help",
          price: 24.99,
          rating: 4.8,
          coverImage: "/api/placeholder/200/300",
          publishedDate: "2024-01-20",
          pages: 224,
          tags: ["Self-Help", "Psychology", "Productivity"],
          uploadedBy: "user789",
          uploadedAt: "2024-01-25T09:15:00Z"
        },
        {
          id: 4,
          title: "Space Adventures: Beyond Earth",
          author: "Captain Alex Turner",
          description: "Join an epic journey through the cosmos in this science fiction adventure. Explore distant galaxies and encounter alien civilizations.",
          genre: "Sci-Fi",
          price: 22.99,
          rating: 4.0,
          coverImage: "/api/placeholder/200/300",
          publishedDate: "2024-04-05",
          pages: 412,
          tags: ["Sci-Fi", "Adventure", "Space"],
          uploadedBy: "user321",
          uploadedAt: "2024-04-10T16:45:00Z"
        }
      ];
      setBooks(sampleBooks);
      setFilteredBooks(sampleBooks);
      setLoading(false);
    }, 1000);
  }, []);

  const genres = ["All", "Technology", "Mystery", "Self-Help", "Sci-Fi", "Fiction", "Non-Fiction", "Romance", "Fantasy", "Biography"];

  // Filter and search functionality
  useEffect(() => {
    let filtered = books;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Genre filter
    if (selectedGenre && selectedGenre !== 'All') {
      filtered = filtered.filter(book => book.genre === selectedGenre);
    }

    // Price range filter
    if (priceRange.min !== '') {
      filtered = filtered.filter(book => book.price >= parseFloat(priceRange.min));
    }
    if (priceRange.max !== '') {
      filtered = filtered.filter(book => book.price <= parseFloat(priceRange.max));
    }

    // Sort books
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.uploadedAt) - new Date(b.uploadedAt));
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'title':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    setFilteredBooks(filtered);
  }, [books, searchTerm, selectedGenre, priceRange, sortBy]);

  const handlePurchase = (bookId) => {
    console.log(`Purchasing book with ID: ${bookId}`);
    // Add purchase logic here
    alert('Purchase functionality would be implemented here!');
  };

  const handlePreview = (bookId) => {
    console.log(`Previewing book with ID: ${bookId}`);
    // Add preview logic here
    alert('Preview functionality would be implemented here!');
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-slate-400'
            }`}
          />
        ))}
        <span className="text-slate-300 text-sm ml-1">({rating})</span>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-blue-200 text-lg">Loading books...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Book Library</h1>
          <p className="text-blue-200">Discover amazing books from our community</p>
        </div>

        {/* Filters and Search */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-blue-500/20 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search books..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-700/50 border border-blue-500/30 rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Genre Filter */}
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="w-full bg-slate-700/50 border border-blue-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {genres.map(genre => (
                <option key={genre} value={genre === 'All' ? '' : genre}>
                  {genre}
                </option>
              ))}
            </select>

            {/* Price Range */}
            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="Min $"
                value={priceRange.min}
                onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                className="w-full bg-slate-700/50 border border-blue-500/30 rounded-lg px-3 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="number"
                placeholder="Max $"
                value={priceRange.max}
                onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                className="w-full bg-slate-700/50 border border-blue-500/30 rounded-lg px-3 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-slate-700/50 border border-blue-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="title">Title A-Z</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <span className="text-blue-200 text-sm">
                {filteredBooks.length} book{filteredBooks.length !== 1 ? 's' : ''} found
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Books Grid/List */}
        {filteredBooks.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-400 mb-2">No books found</h3>
            <p className="text-slate-500">Try adjusting your search criteria</p>
          </div>
        ) : (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {filteredBooks.map((book) => (
              <div
                key={book.id}
                className={`bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-blue-500/20 overflow-hidden hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105 ${
                  viewMode === 'list' ? 'flex' : ''
                }`}
              >
                {/* Book Cover */}
                <div className={`${viewMode === 'list' ? 'w-48 flex-shrink-0' : 'aspect-[3/4]'} bg-slate-700 flex items-center justify-center relative overflow-hidden`}>
                  <BookOpen className="w-12 h-12 text-slate-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
                </div>

                {/* Book Info */}
                <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">{book.title}</h3>
                    <p className="text-blue-300 text-sm mb-2">by {book.author}</p>
                    <div className="mb-3">
                      {renderStars(book.rating)}
                    </div>
                  </div>

                  <p className={`text-slate-300 text-sm mb-4 ${viewMode === 'grid' ? 'line-clamp-3' : 'line-clamp-2'}`}>
                    {book.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {book.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-600/20 text-blue-200 text-xs rounded-full border border-blue-500/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Book Details */}
                  <div className="flex items-center justify-between text-sm text-slate-400 mb-4">
                    <span>{book.genre}</span>
                    <span>{book.pages} pages</span>
                  </div>

                  {/* Price and Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <DollarSign className="w-5 h-5 text-green-400" />
                      <span className="text-2xl font-bold text-green-400">{book.price}</span>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handlePreview(book.id)}
                        className="p-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors duration-200"
                        title="Preview"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handlePurchase(book.id)}
                        className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all duration-200 flex items-center space-x-2"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        <span>Buy</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookList;