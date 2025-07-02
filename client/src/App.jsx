import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';

import ExplorePage from './components/ExplorePage';
import Dashboard from './components/Dashboard';
import SignUpModal from './components/modals/SignUpModal';
import UploadModal from './components/modals/UploadModal';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';


import FooterNav from './components/FooterNav';
import HeadNav from './components/HeadNav';
import Login from './components/Login';
import Signup from './components/Signup';
import ForgotPassword from './components/ForgotPassword';
import UploadBook from './components/UploadBook';
import UserHistory from './components/UserHistory';
import ResetPassword from './ResetPassword';

import Home from './components/Home';
import { genres, sampleBooks } from './data/sampleData';

import './App.css';
import './index.css';


const AppContent = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  const logout = () => {
  localStorage.removeItem("token");      // 🧽 Remove token from storage
  setCurrentUser(null);                  // ❌ Clear user context/state
  navigate("/");                         // 🔁 Redirect to homepage
  window.location.reload();              // ✅ Reload to re-render based on auth state
};

  const [books, setBooks] = useState([]);
  const [userHistory, setUserHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [showSignUp, setShowSignUp] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const token = localStorage.getItem("token");

  // Load user from localStorage on mount (persist login)
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  // Sample data initialization
  useEffect(() => {
    setBooks(sampleBooks);
  }, []);

  // Generate recommendations based on user interests and history
  useEffect(() => {
    if (currentUser && books.length > 0) {
      const userInterests = currentUser.interests || [];
      const historyGenres = userHistory.map(h => h.genre);
      const allPreferences = [...userInterests, ...historyGenres];

      const recommended = books.filter(book =>
        allPreferences.includes(book.genre) &&
        !userHistory.some(h => h.bookId === book.id)
      ).slice(0, 6);

      setRecommendations(recommended);
    }
  }, [currentUser, books, userHistory]);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const appProps = {
    currentUser,
    setCurrentUser,
    books,
    setBooks,
    userHistory,
    setUserHistory,
    searchTerm,
    setSearchTerm,
    selectedGenre,
    setSelectedGenre,
    showSignUp,
    setShowSignUp,
    showUpload,
    setShowUpload,
    recommendations,
    genres,
    navigate: handleNavigation
  };

  return (
    <>
      {/* Background video */}
<video
  className="fixed top-0 left-0 w-full h-full object-cover z-[-2]"
  autoPlay
  muted
  loop
  playsInline
>
  <source src="/back_anime.mp4" type="video/mp4" />
</video>


      {/* Main content with higher z-index */}
      <div className="fixed top-0 left-0 w-full h-full bg-black/30 backdrop-blur-md z-[-1]" />

<div className="relative z-10 w-screen  flex flex-col items-center justify-center -ml-33">


  <div className="flex-grow px-6 py-6 max-w-[1200px] mx-auto">
          <Routes>
            <Route path="/" element={<Home {...appProps} />} />
            <Route
  path="/login"
  element={
    token
      ? <Navigate to="/dashboard" />
      : <Login setCurrentUser={setCurrentUser} navigate={handleNavigation} />
  }
/>

<Route
  path="/signup"
  element={
    token
      ? <Navigate to="/dashboard" />
      : <Signup navigate={handleNavigation} />
  }
/>

            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route
  path="/dashboard"
  element={token ? <Dashboard {...appProps} /> : <Navigate to="/login" />}
/>
<Route
  path="/uploadbook"
  element={token ? <UploadBook /> : <Navigate to="/login" />}
/>
<Route path="/about" element={<About />} />
<Route path="/services" element={<Services />} />
<Route path="/contact" element={<Contact />} />

<Route
  path="/userhistory"
  element={token ? <UserHistory /> : <Navigate to="/login" />}
/>
</Routes>

          {/* Modals are rendered globally */}
          {showSignUp && <SignUpModal {...appProps} />}
          {showUpload && <UploadModal {...appProps} />}
        </div>

        <FooterNav />
      </div>
    </>
  );
};




const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
