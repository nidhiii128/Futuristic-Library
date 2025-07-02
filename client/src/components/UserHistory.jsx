import React, { useState, useEffect } from 'react';
import { BookOpen, Upload, ShoppingCart, Calendar, DollarSign, Eye, Edit, Trash2, TrendingUp, Award } from 'lucide-react';

const UserHistory = () => {
  const [activeTab, setActiveTab] = useState('uploaded');
  const [uploadedBooks, setUploadedBooks] = useState([]);
  const [purchasedBooks, setPurchasedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUploaded: 0,
    totalPurchased: 0,
    totalEarnings: 0,
    totalSpent: 0
  });

  // Sample data - replace with actual API calls
  useEffect(() => {
    setTimeout(() => {
      const sampleUploadedBooks = [
        {
          id: 1,
          title: "The Future of AI",
          author: "Dr. Sarah Chen",
          genre: "Technology",
          price: 29.99,
          uploadDate: "2024-03-20T10:00:00Z",
          status: "active",
          sales: 45,
          earnings: 1349.55,
          rating: 4.5,
          views: 892
        },
        {
          id: 2,
          title: "React Best Practices",
          author: "John Developer",
          genre: "Programming",
          price: 39.99,
          uploadDate: "2024-02-15T14:30:00Z",
          status: "active",
          sales: 23,
          earnings: 919.77,
          rating: 4.2,
          views: 567
        },
        {
          id: 3,
          title: "Web Design Fundamentals",
          author: "Jane Designer",
          genre: "Design",
          price: 24.99,
          uploadDate: "2024-01-10T09:15:00Z",
          status: "pending",
          sales: 0,
          earnings: 0,
          rating: 0,
          views: 23
        }
      ];

      const samplePurchasedBooks = [
        {
          id: 101,
          title: "Machine Learning Mastery",
          author: "Dr. Alex Kumar",
          genre: "Technology",
          price: 49.99,
          purchaseDate: "2024-04-15T16:45:00Z",
          downloadCount: 3,
          rating: 5,
          reviewed: true
        },
        {
          id: 102,
          title: "Mystery of the Lost City",
          author: "Emma Watson",
          genre: "Mystery",
          price: 19.99,
          purchaseDate: "2024-04-10T11:20:00Z",
          downloadCount: 1,
          rating: 4,
          reviewed: true
        },
        {
          id: 103,
          title: "Cooking Masterclass",
          author: "Chef Marco",
          genre: "Cooking",
          price: 34.99,
          purchaseDate: "2024-03-28T20:10:00Z",
          downloadCount: 5,
          rating: 0,
          reviewed: false
        }
      ];

      setUploadedBooks(sampleUploadedBooks);
      setPurchasedBooks(samplePurchasedBooks);
      
      // Calculate stats
      const totalEarnings = sampleUploadedBooks.reduce((sum, book) => sum + book.earnings, 0);
      const totalSpent = samplePurchasedBooks.reduce((sum, book) => sum + book.price, 0);
      
      setStats({
        totalUploaded: sampleUploadedBooks.length,
        totalPurchased: samplePurchasedBooks.length,
        totalEarnings: totalEarnings,
        totalSpent: totalSpent
      });
      
      setLoading(false);
    }, 1000);
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`text-sm ${
              star <= rating ? 'text-yellow-400' : 'text-slate-400'
            }`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  const handleEdit = (bookId) => {
    console.log(`Editing book with ID: ${bookId}`);
    alert('Edit functionality would redirect to edit form!');
  };

  const handleDelete = (bookId) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      setUploadedBooks(prev => prev.filter(book => book.id !== bookId));
      console.log(`Deleted book with ID: ${bookId}`);
    }
  };

  const handleDownload = (bookId) => {
    console.log(`Downloading book with ID: ${bookId}`);
    // Update download count
    setPurchasedBooks(prev => 
      prev.map(book => 
        book.id === bookId 
          ? { ...book, downloadCount: book.downloadCount + 1 }
          : book
      )
    );
    alert('Download started!');
  };

  const handleRate = (bookId, rating) => {
    setPurchasedBooks(prev => 
      prev.map(book => 
        book.id === bookId 
          ? { ...book, rating: rating, reviewed: true }
          : book
      )
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-blue-200 text-lg">Loading your history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">My Library</h1>
          <p className="text-blue-200">Track your uploads and purchases</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-blue-500/20 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Books Uploaded</p>
                <p className="text-3xl font-bold text-white">{stats.totalUploaded}</p>
              </div>
              <Upload className="w-8 h-8 text-blue-400" />
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-blue-500/20 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Books Purchased</p>
                <p className="text-3xl font-bold text-white">{stats.totalPurchased}</p>
              </div>
              <ShoppingCart className="w-8 h-8 text-green-400" />
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-blue-500/20 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Earnings</p>
                <p className="text-3xl font-bold text-green-400">${stats.totalEarnings.toFixed(2)}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-400" />
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-blue-500/20 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Spent</p>
                <p className="text-3xl font-bold text-purple-400">${stats.totalSpent.toFixed(2)}</p>
              </div>
              <DollarSign className="w-8 h-8 text-purple-400" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-slate-800/30 rounded-xl p-1 mb-8 max-w-md mx-auto">
          <button
            onClick={() => setActiveTab('uploaded')}
            className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              activeTab === 'uploaded'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Upload className="w-4 h-4 inline mr-2" />
            Uploaded
          </button>
          <button
            onClick={() => setActiveTab('purchased')}
            className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              activeTab === 'purchased'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <ShoppingCart className="w-4 h-4 inline mr-2" />
            Purchased
          </button>
        </div>

        {/* Content */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-blue-500/20 overflow-hidden">
          {activeTab === 'uploaded' ? (
            <div className="p-6">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Upload className="w-6 h-6 mr-2" />
                Your Uploaded Books
              </h2>
              
              {uploadedBooks.length === 0 ? (
                <div className="text-center py-12">
                  <BookOpen className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-slate-400 mb-2">No books uploaded yet</h3>
                  <p className="text-slate-500">Start sharing your knowledge with the world!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {uploadedBooks.map((book) => (
                    <div key={book.id} className="bg-slate-700/30 rounded-xl p-6 border border-slate-600/30">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <h3 className="text-xl font-bold text-white">{book.title}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              book.status === 'active' 
                                ? 'bg-green-600/20 text-green-400 border border-green-500/30'
                                : 'bg-yellow-600/20 text-yellow-400 border border-yellow-500/30'
                            }`}>
                              {book.status}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div>
                              <p className="text-slate-400 text-sm">Price</p>
                              <p className="text-green-400 font-semibold">${book.price}</p>
                            </div>
                            <div>
                              <p className="text-slate-400 text-sm">Sales</p>
                              <p className="text-white font-semibold">{book.sales}</p>
                            </div>
                            <div>
                              <p className="text-slate-400 text-sm">Earnings</p>
                              <p className="text-green-400 font-semibold">${book.earnings.toFixed(2)}</p>
                            </div>
                            <div>
                              <p className="text-slate-400 text-sm">Views</p>
                              <p className="text-blue-400 font-semibold">{book.views}</p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-1">
                                {renderStars(book.rating)}
                                <span className="text-slate-300 text-sm">({book.rating})</span>
                              </div>
                              <span className="text-slate-400 text-sm">
                                Uploaded on {formatDate(book.uploadDate)}
                              </span>
                            </div>
                            
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleEdit(book.id)}
                                className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
                                title="Edit"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(book.id)}
                                className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="p-6">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <ShoppingCart className="w-6 h-6 mr-2" />
                Your Purchased Books
              </h2>
              
              {purchasedBooks.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-slate-400 mb-2">No books purchased yet</h3>
                  <p className="text-slate-500">Explore our library and find your next great read!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {purchasedBooks.map((book) => (
                    <div key={book.id} className="bg-slate-700/30 rounded-xl p-6 border border-slate-600/30">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white mb-2">{book.title}</h3>
                          <p className="text-blue-300 mb-3">by {book.author}</p>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div>
                              <p className="text-slate-400 text-sm">Price Paid</p>
                              <p className="text-green-400 font-semibold">${book.price}</p>
                            </div>
                            <div>
                              <p className="text-slate-400 text-sm">Downloads</p>
                              <p className="text-white font-semibold">{book.downloadCount}</p>
                            </div>
                            <div>
                              <p className="text-slate-400 text-sm">Genre</p>
                              <p className="text-blue-400 font-semibold">{book.genre}</p>
                            </div>
                            <div>
                              <p className="text-slate-400 text-sm">Purchased</p>
                              <p className="text-slate-300 font-semibold">{formatDate(book.purchaseDate)}</p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-2">
                                <span className="text-slate-400 text-sm">Your Rating:</span>
                                <div className="flex space-x-1">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                      key={star}
                                      onClick={() => handleRate(book.id, star)}
                                      className={`text-lg transition-colors duration-200 ${
                                        star <= book.rating 
                                          ? 'text-yellow-400 hover:text-yellow-300' 
                                          : 'text-slate-600 hover:text-slate-500'
                                      }`}
                                    >
                                      ★
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>
                            
                            <button
                              onClick={() => handleDownload(book.id)}
                              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all duration-200 flex items-center space-x-2"
                            >
                              <BookOpen className="w-4 h-4" />
                              <span>Download</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserHistory;