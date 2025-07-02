import React from 'react';

export default function Contact() {
  return (
    <section className="py-20 text-white bg-black bg-opacity-30">
      <div className="max-w-xl mx-auto text-center px-6">
        <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          Contact Us
        </h2>
        <p className="text-lg mb-8 text-gray-300">
          Have questions, feedback, or collaboration ideas? Reach out — we’d love to hear from you!
        </p>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full px-4 py-3 bg-black bg-opacity-50 rounded-lg text-white border border-purple-600 focus:outline-none"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full px-4 py-3 bg-black bg-opacity-50 rounded-lg text-white border border-purple-600 focus:outline-none"
          />
          <textarea
            placeholder="Your Message"
            rows="4"
            className="w-full px-4 py-3 bg-black bg-opacity-50 rounded-lg text-white border border-purple-600 focus:outline-none"
          ></textarea>
          <button
            type="submit"
            className="bg-gradient-to-r from-purple-600 to-blue-600 py-2 px-6 rounded-full text-white hover:opacity-90"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
