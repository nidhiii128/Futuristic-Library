import React from 'react';

export default function Services() {
  const services = [
    { icon: '📚', title: 'Book Uploading', desc: 'Share your knowledge with the world.' },
    { icon: '🔎', title: 'Smart Search', desc: 'Find books by topic, author, or genre.' },
    { icon: '📊', title: 'Reading Analytics', desc: 'Track your reading patterns and growth.' }
  ];

  return (
    <section className="py-20 text-white bg-black bg-opacity-30">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-10 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          Our Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <div key={i} className="bg-black bg-opacity-60 p-6 rounded-2xl shadow-xl border border-purple-600">
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-300">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
