import React from 'react';

export default function About() {
  return (
    <section className="py-20 text-white bg-black bg-opacity-30">
      <div className="max-w-5xl mx-auto text-center px-6">
        <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          About Us
        </h2>
        <p className="text-lg leading-relaxed text-gray-300">
          FutureLibrary is a futuristic knowledge hub designed for curious minds. Whether you're a student, reader, or creator — this platform helps you explore, upload, and connect in a seamless digital reading space.
        </p>
      </div>
    </section>
  );
}
