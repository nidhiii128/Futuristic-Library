import React, { useState } from "react";
import { Upload, BookOpen } from "lucide-react";
import HeadNav from "./HeadNav";
import UploadBook from "./UploadBook";

const Home = ({ currentUser, genres = [], setSelectedGenre, navigate }) => {
  const token = localStorage.getItem("token");
  const [showUpload, setShowUpload] = useState(false);

  const handleExploreClick = () => {
    navigate("/explore");
  };

  const handleGenreClick = (genreId) => {
    setSelectedGenre(genreId);
    navigate("/explore");
  };

  if (showUpload) return <UploadBook />;

  return (
    <div className="w-full min-h-screen bg-grid-sm bg-grid-custom sm:bg-grid-md md:bg-grid-lg bg-no-repeat bg-center bg-cover">
      <HeadNav
        currentUser={currentUser}
        navigate={navigate}
        setShowUpload={setShowUpload}
      />

      <div className="max-w-7xl mx-auto px-20 py-16 grid grid-cols-1 gap-y-8">
        {/* Section 1: Hero Text */}
        <section className="bg-black/70 backdrop-blur-md rounded-2xl p-8 text-center shadow-lg flex flex-col justify-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Discover Your Next{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Adventure
            </span>
          </h2>
          <p className="text-lg text-gray-300">
            Upload, explore, and immerse yourself in a universe of knowledge.
            Connect with readers worldwide.
          </p>
        </section>

        {/* Section 2: Action Buttons */}
        <section className="bg-black/70 backdrop-blur-md rounded-2xl p-8 shadow-lg flex flex-col justify-center items-center gap-6">
          <button
            onClick={() =>
              token ? setShowUpload(true) : navigate("/login")
            }
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-semibold text-lg flex items-center gap-3 transition-all hover:scale-105"
          >
            <Upload size={24} />
            <span>{token ? "Upload Your Book" : "Login to Upload"}</span>
          </button>

          <button
            onClick={handleExploreClick}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold text-lg flex items-center gap-3 transition-all hover:scale-105"
          >
            <BookOpen size={24} />
            <span>Start Reading</span>
          </button>
        </section>

        {/* Section 3: Genre Grid */}
        <section className="bg-black/70 backdrop-blur-md rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-semibold text-white text-center mb-6">
            Explore by Genre
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {genres.slice(0, 8).map((genre) => (
              <button
                key={genre.id}
                onClick={() => handleGenreClick(genre.id)}
                className={`p-4 rounded-xl border border-gray-700 hover:border-gray-600 bg-gradient-to-br ${genre.color} bg-opacity-10 hover:bg-opacity-20 transition-all group`}
              >
                <genre.icon
                  size={28}
                  className="mx-auto mb-2 text-white group-hover:scale-110 transition-transform"
                />
                <span className="text-white font-medium text-sm">
                  {genre.name}
                </span>
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
