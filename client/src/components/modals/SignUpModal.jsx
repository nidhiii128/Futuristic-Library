// components/modals/SignUpModal.jsx
import React, { useState } from 'react';
import { X, Mail, Lock, User, Sparkles } from 'lucide-react';

const SignUpModal = ({ setShowSignUp, setCurrentUser, genres }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    interests: []
  });

  const handleInterestToggle = (genreId) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(genreId)
        ? prev.interests.filter(i => i !== genreId)
        : [...prev.interests, genreId]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      setStep(2);
    } else {
      // Create user
      const newUser = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        interests: formData.interests
      };
      
      setCurrentUser(newUser);
      setShowSignUp(false);
      alert('Account created successfully!');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 text-white rounded-xl p-6 shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            {step === 1 ? 'Create Account' : 'Choose Your Interests'}
          </h2>
          <button
            onClick={() => setShowSignUp(false)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {step === 1 ? (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <User size={16} className="inline mr-2" />
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Mail size={16} className="inline mr-2" />
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Lock size={16} className="inline mr-2" />
                  Password
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Lock size={16} className="inline mr-2" />
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none text-white"
                  required
                />
              </div>
            </>
          ) : (
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles size={20} className="text-purple-400" />
                <label className="text-sm font-medium text-gray-300">
                  Select genres you're interested in (optional):
                </label>
              </div>
              <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                {genres.map(genre => (
                  <button
                    key={genre.id}
                    type="button"
                    onClick={() => handleInterestToggle(genre.id)}
                    className={`p-3 rounded-lg border transition-all flex items-center space-x-2 ${
                      formData.interests.includes(genre.id)
                        ? 'bg-blue-600 border-blue-500 text-white'
                        : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    <genre.icon size={16} />
                    <span className="text-sm">{genre.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg font-semibold transition-all"
          >
            {step === 1 ? 'Continue' : 'Create Account'}
          </button>
        </form>

        {step === 1 && (
          <p className="text-center text-sm text-gray-400 mt-4">
            Already have an account?{' '}
            <button
              onClick={() => setShowSignUp(false)}
              className="text-blue-400 hover:text-blue-300"
            >
              Sign In
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export default SignUpModal;