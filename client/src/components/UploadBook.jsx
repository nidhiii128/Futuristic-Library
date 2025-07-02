import React, { useState } from 'react';
import { Upload, BookOpen, DollarSign, FileText, Image, Tag, User, Calendar, Star } from 'lucide-react';

const UploadBook = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    genre: '',
    price: '',
    publishedDate: '',
    isbn: '',
    language: 'English',
    pages: '',
    rating: 0,
    coverImage: null,
    bookFile: null,
    tags: []
  });

  const [tagInput, setTagInput] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const genres = [
    'Fiction', 'Non-Fiction', 'Mystery', 'Romance', 'Sci-Fi', 'Fantasy', 
    'Biography', 'History', 'Self-Help', 'Technology', 'Business', 'Education'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e, fileType) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      [fileType]: file
    }));
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleStarRating = (rating) => {
    setFormData(prev => ({
      ...prev,
      rating
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    
    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setUploadProgress(i);
    }

    try {
      // Here you would typically send data to your backend
      const bookData = {
        ...formData,
        uploadedAt: new Date().toISOString(),
        uploadedBy: 'current-user-id', // Replace with actual user ID
        status: 'active'
      };

      console.log('Uploading book:', bookData);
      
      // Reset form after successful upload
      setFormData({
        title: '',
        author: '',
        description: '',
        genre: '',
        price: '',
        publishedDate: '',
        isbn: '',
        language: 'English',
        pages: '',
        rating: 0,
        coverImage: null,
        bookFile: null,
        tags: []
      });
      
      alert('Book uploaded successfully!');
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Upload Your Book</h1>
          <p className="text-blue-200">Share your knowledge with the world</p>
        </div>

        {/* Form */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-blue-500/20 p-8 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-blue-200 text-sm font-medium mb-2">
                  <BookOpen className="inline w-4 h-4 mr-2" />
                  Book Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-slate-700/50 border border-blue-500/30 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter book title"
                />
              </div>

              {/* Author */}
              <div>
                <label className="block text-blue-200 text-sm font-medium mb-2">
                  <User className="inline w-4 h-4 mr-2" />
                  Author *
                </label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-slate-700/50 border border-blue-500/30 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter author name"
                />
              </div>

              {/* Genre */}
              <div>
                <label className="block text-blue-200 text-sm font-medium mb-2">
                  <Tag className="inline w-4 h-4 mr-2" />
                  Genre *
                </label>
                <select
                  name="genre"
                  value={formData.genre}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-slate-700/50 border border-blue-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">Select a genre</option>
                  {genres.map(genre => (
                    <option key={genre} value={genre}>{genre}</option>
                  ))}
                </select>
              </div>

              {/* Price */}
              <div>
                <label className="block text-blue-200 text-sm font-medium mb-2">
                  <DollarSign className="inline w-4 h-4 mr-2" />
                  Price (USD) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  min="0"
                  step="0.01"
                  className="w-full bg-slate-700/50 border border-blue-500/30 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="0.00"
                />
              </div>

              {/* Published Date */}
              <div>
                <label className="block text-blue-200 text-sm font-medium mb-2">
                  <Calendar className="inline w-4 h-4 mr-2" />
                  Published Date
                </label>
                <input
                  type="date"
                  name="publishedDate"
                  value={formData.publishedDate}
                  onChange={handleInputChange}
                  className="w-full bg-slate-700/50 border border-blue-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              {/* ISBN & Pages */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-blue-200 text-sm font-medium mb-2">ISBN</label>
                  <input
                    type="text"
                    name="isbn"
                    value={formData.isbn}
                    onChange={handleInputChange}
                    className="w-full bg-slate-700/50 border border-blue-500/30 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="ISBN"
                  />
                </div>
                <div>
                  <label className="block text-blue-200 text-sm font-medium mb-2">Pages</label>
                  <input
                    type="number"
                    name="pages"
                    value={formData.pages}
                    onChange={handleInputChange}
                    className="w-full bg-slate-700/50 border border-blue-500/30 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Description */}
              <div>
                <label className="block text-blue-200 text-sm font-medium mb-2">
                  <FileText className="inline w-4 h-4 mr-2" />
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full bg-slate-700/50 border border-blue-500/30 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Describe your book..."
                />
              </div>

              {/* Rating */}
              <div>
                <label className="block text-blue-200 text-sm font-medium mb-2">
                  <Star className="inline w-4 h-4 mr-2" />
                  Self Rating
                </label>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleStarRating(star)}
                      className={`w-8 h-8 transition-colors duration-200 ${
                        star <= formData.rating 
                          ? 'text-yellow-400 hover:text-yellow-300' 
                          : 'text-slate-600 hover:text-slate-500'
                      }`}
                    >
                      <Star className="w-full h-full fill-current" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-blue-200 text-sm font-medium mb-2">Tags</label>
                <div className="flex space-x-2 mb-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    className="flex-1 bg-slate-700/50 border border-blue-500/30 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Add a tag"
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 bg-blue-600/20 text-blue-200 text-sm rounded-full border border-blue-500/30"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-2 text-blue-300 hover:text-white"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* File Uploads */}
              <div className="space-y-4">
                {/* Cover Image */}
                <div>
                  <label className="block text-blue-200 text-sm font-medium mb-2">
                    <Image className="inline w-4 h-4 mr-2" />
                    Cover Image *
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, 'coverImage')}
                      required
                      className="hidden"
                      id="cover-upload"
                    />
                    <label
                      htmlFor="cover-upload"
                      className="flex items-center justify-center w-full h-32 bg-slate-700/30 border-2 border-dashed border-blue-500/50 rounded-lg cursor-pointer hover:bg-slate-700/50 transition-all duration-200"
                    >
                      <div className="text-center">
                        <Upload className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                        <p className="text-blue-200 text-sm">
                          {formData.coverImage ? formData.coverImage.name : 'Click to upload cover'}
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Book File */}
                <div>
                  <label className="block text-blue-200 text-sm font-medium mb-2">
                    <FileText className="inline w-4 h-4 mr-2" />
                    Book File (PDF) *
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => handleFileChange(e, 'bookFile')}
                      required
                      className="hidden"
                      id="book-upload"
                    />
                    <label
                      htmlFor="book-upload"
                      className="flex items-center justify-center w-full h-24 bg-slate-700/30 border-2 border-dashed border-blue-500/50 rounded-lg cursor-pointer hover:bg-slate-700/50 transition-all duration-200"
                    >
                      <div className="text-center">
                        <Upload className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                        <p className="text-blue-200 text-sm">
                          {formData.bookFile ? formData.bookFile.name : 'Click to upload PDF'}
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Upload Progress */}
          {isUploading && (
            <div className="mt-6">
              <div className="bg-slate-700 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-full transition-all duration-300 ease-out"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="text-blue-200 text-sm mt-2 text-center">
                Uploading... {uploadProgress}%
              </p>
            </div>
          )}

          {/* Submit Button */}
          <div className="mt-8 flex justify-center">
            <button
              type="submit"
              disabled={isUploading}
              className={`px-8 py-4 rounded-xl font-semibold text-white transition-all duration-200 transform hover:scale-105 ${
                isUploading
                  ? 'bg-slate-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
              }`}
            >
              {isUploading ? (
                <span className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Uploading...
                </span>
              ) : (
                <span className="flex items-center">
                  <Upload className="w-5 h-5 mr-2" />
                  Upload Book
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadBook;