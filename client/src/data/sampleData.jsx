// data/sampleData.js
import { Book, Heart, Zap, Sword, Sparkles, Globe, Brain, Users } from 'lucide-react';

export const genres = [
  {
    id: 'fiction',
    name: 'Fiction',
    icon: Book,
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'romance',
    name: 'Romance',  
    icon: Heart,
    color: 'from-pink-500 to-red-500'
  },
  {
    id: 'sci-fi',
    name: 'Sci-Fi',
    icon: Zap,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'fantasy',
    name: 'Fantasy',
    icon: Sparkles,
    color: 'from-purple-500 to-indigo-500'
  },
  {
    id: 'mystery',
    name: 'Mystery',
    icon: Sword,
    color: 'from-gray-500 to-slate-600'
  },
  {
    id: 'history',
    name: 'History',
    icon: Globe,
    color: 'from-amber-500 to-orange-500'
  },
  {
    id: 'science',
    name: 'Science',
    icon: Brain,
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'biography',
    name: 'Biography',
    icon: Users,
    color: 'from-teal-500 to-cyan-500'
  }
];

export const sampleBooks = [
  {
    id: 1,
    title: "The Quantum Paradox",
    author: "Sarah Chen",
    genre: "sci-fi",
    price: 12.99,
    rating: 4.5,
    views: 1250,
    uploadedBy: 1,
    image: null
  },
  {
    id: 2,
    title: "Hearts in Harmony",
    author: "Emma Rodriguez",
    genre: "romance",
    price: 9.99,
    rating: 4.2,
    views: 890,
    uploadedBy: 2,
    image: null
  },
  {
    id: 3,
    title: "The Crystal Kingdom",
    author: "Marcus Vale",
    genre: "fantasy",
    price: 14.99,
    rating: 4.8,
    views: 2100,
    uploadedBy: 1,
    image: null
  },
  {
    id: 4,
    title: "Murder at Midnight",
    author: "Detective Mills",
    genre: "mystery",
    price: 11.99,
    rating: 4.3,
    views: 756,
    uploadedBy: 3,
    image: null
  },
  {
    id: 5,
    title: "The Last Empress",
    author: "Li Wei",
    genre: "history",
    price: 13.99,
    rating: 4.6,
    views: 1456,
    uploadedBy: 2,
    image: null
  },
  {
    id: 6,
    title: "Modern Physics Explained",
    author: "Dr. James Wilson",
    genre: "science",
    price: 19.99,
    rating: 4.4,
    views: 643,
    uploadedBy: 4,
    image: null
  },
  {
    id: 7,
    title: "Steve Jobs: The Visionary",
    author: "Tech Insider",
    genre: "biography",
    price: 16.99,
    rating: 4.7,
    views: 2340,
    uploadedBy: 1,
    image: null
  },
  {
    id: 8,
    title: "Love in Paris",
    author: "Sophie Laurent",
    genre: "romance",
    price: 8.99,
    rating: 4.1,
    views: 1123,
    uploadedBy: 3,
    image: null
  }
];