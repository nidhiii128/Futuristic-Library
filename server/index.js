require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const User = require("./models/User"); 
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files for uploaded content
app.use('/uploads', express.static('uploads'));

// Create uploads directories if they don't exist
const uploadsDir = 'uploads';
const booksDir = path.join(uploadsDir, 'books');
const coversDir = path.join(uploadsDir, 'covers');

[uploadsDir, booksDir, coversDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Connect to MongoDB with environment variable or fallback
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/library-app';

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => {
    console.error('❌ MongoDB connection failed!');
    console.error(err.message || err);
  });

require('dotenv').config(); // make sure this is at the top


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // comes from .env
    pass: process.env.EMAIL_PASS, // comes from .env
  },
});


// Book schema
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  author: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  genre: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  publishedDate: { type: Date },
  isbn: { type: String, trim: true },
  language: { type: String, default: 'English' },
  pages: { type: Number, min: 1 },
  rating: { type: Number, min: 0, max: 5, default: 0 },
  tags: [{ type: String, trim: true }],
  coverImage: { type: String, required: true }, // File path
  bookFile: { type: String, required: true }, // File path
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  uploadedAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['active', 'inactive', 'pending'], default: 'pending' },
  downloads: { type: Number, default: 0 },
  views: { type: Number, default: 0 }
});

const Book = mongoose.model('Book', bookSchema);

// OTP Schema with TTL index (expire after 10 mins)
const otpSchema = new mongoose.Schema({
  email: { type: String, required: true, lowercase: true, trim: true, unique: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 600 }, // 600 seconds = 10 minutes TTL
});

const Otp = mongoose.model('Otp', otpSchema);

const OTP_EXPIRATION_MINUTES = 10;

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'coverImage') {
      cb(null, coversDir);
    } else if (file.fieldname === 'bookFile') {
      cb(null, booksDir);
    } else {
      cb(new Error('Invalid field name'), null);
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  if (file.fieldname === 'coverImage') {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Cover image must be an image file'), false);
    }
  } else if (file.fieldname === 'bookFile') {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Book file must be a PDF'), false);
    }
  } else {
    cb(new Error('Invalid field name'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit
  }
});

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
}

// Route: Send OTP for signup
// Route: Send OTP for signup
app.post('/send-otp', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: 'Email is required' });
  }

  const otp = generateOTP();

  try {
    // Save or update OTP in DB
    await Otp.findOneAndUpdate(
      { email },
      { otp, createdAt: new Date() },
      { upsert: true, new: true }
    );

    // Log OTP and email for debugging
    console.log("📧 Sending OTP to:", email);
    console.log("🔢 OTP:", otp);

    // Attempt to send the email
    try {
      const info = await transporter.sendMail({
        from: `"Library System" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Your OTP for Signup",
        text: `Your OTP is: ${otp}`,
      });

      console.log("✅ Email sent:", info.response);
      res.json({ success: true, message: "OTP sent successfully" });

    } catch (emailErr) {
      console.error("❌ Email sending failed:", emailErr);
      res.status(500).json({ success: false, message: "Failed to send OTP email" });
    }

  } catch (dbErr) {
    console.error("❌ DB error while storing OTP:", dbErr);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Route: Verify OTP
app.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) return res.status(400).json({ success: false, message: 'Email and OTP required' });

  try {
    const record = await Otp.findOne({ email });

    if (!record || record.otp !== otp) {
      return res.status(400).json({ success: false, message: 'Incorrect or expired OTP' });
    }

    // Check if OTP expired (redundant due to TTL, but kept for extra safety)
    const now = new Date();
    const otpAgeMinutes = (now - record.createdAt) / 1000 / 60;
    if (otpAgeMinutes > OTP_EXPIRATION_MINUTES) {
      return res.status(400).json({ success: false, message: 'OTP expired' });
    }

    res.json({ success: true, message: 'OTP verified successfully' });
  } catch (err) {
    console.error("❌ Error verifying OTP:", err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.post('/signup', async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  if (!email || !password || !confirmPassword) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ success: false, message: 'Passwords do not match' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ success: true, message: 'User created successfully' });
  } catch (err) {
    console.error("❌ Signup error:", err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Forgot password flow
app.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ success: false, message: 'Email is required' });

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'No user with that email' });
    }

  // Generate reset token and expiry (store in DB)
  const token = Math.random().toString(36).substring(2);
  user.resetToken = token;
  user.resetTokenExpiry = Date.now() + 3600000; // 1 hour
  await user.save();

    const resetLink = `http://localhost:5173/reset-password/${token}`;

// Send Email
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "your@gmail.com",
      pass: "vbypafgpyoytyguq", // use Gmail App Password here
    },
  });

  const mailOptions = {
    from: "Library App <your@gmail.com>",
    to: email,
    subject: "Password Reset",
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Email error:", error);
      return res.status(500).json({ message: "Failed to send reset link" });
    }
    return res.json({ message: "Reset link sent to email." });
  });
} catch (err) {
    console.error("Forgot password error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.post('/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;
  if (!token || !newPassword) return res.status(400).json({ success: false, message: 'Token and new password required' });

  try {
    const record = await ResetToken.findOne({ token });
    if (!record) {
      return res.status(400).json({ success: false, message: 'Invalid or expired token' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.updateOne({ email: record.email }, { password: hashedPassword });

    // Delete token after use
    await ResetToken.deleteOne({ token });

    res.json({ success: true, message: 'Password reset successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to reset password' });
  }
});

// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ success: false, message: 'Email and password required' });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    // Generate token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};


// Book upload route
app.post('/upload-book', upload.fields([
  { name: 'coverImage', maxCount: 1 },
  { name: 'bookFile', maxCount: 1 }
]), async (req, res) => {
  try {
    const {
      title, author, description, genre, price, publishedDate,
      isbn, language, pages, rating, tags, uploadedBy
    } = req.body;

    // Check if files were uploaded
    if (!req.files?.coverImage || !req.files?.bookFile) {
      return res.status(400).json({
        success: false,
        message: 'Both cover image and book file are required'
      });
    }

    // Parse tags if it's a string
    let parsedTags = [];
    if (tags) {
      try {
        parsedTags = typeof tags === 'string' ? JSON.parse(tags) : tags;
      } catch (err) {
        parsedTags = [];
      }
    }

    // Create book record
    const book = new Book({
      title,
      author,
      description,
      genre,
      price: parseFloat(price),
      publishedDate: publishedDate ? new Date(publishedDate) : undefined,
      isbn,
      language: language || 'English',
      pages: pages ? parseInt(pages) : undefined,
      rating: rating ? parseFloat(rating) : 0,
      tags: parsedTags,
      coverImage: req.files.coverImage[0].path,
      bookFile: req.files.bookFile[0].path,
      uploadedBy: uploadedBy || '000000000000000000000000', // Default ObjectId if not provided
      status: 'active'
    });

    await book.save();

    res.json({
      success: true,
      message: 'Book uploaded successfully',
      book: {
        id: book._id,
        title: book.title,
        author: book.author,
        coverImage: `/uploads/covers/${path.basename(book.coverImage)}`,
        bookFile: `/uploads/books/${path.basename(book.bookFile)}`
      }
    });

  } catch (err) {
    console.error('Book upload error:', err);
    
    // Clean up uploaded files if database save fails
    if (req.files) {
      Object.values(req.files).flat().forEach(file => {
        fs.unlink(file.path, (unlinkErr) => {
          if (unlinkErr) console.error('Error deleting file:', unlinkErr);
        });
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to upload book'
    });
  }
});

// Get all books
app.get('/books', async (req, res) => {
  try {
    const { page = 1, limit = 10, genre, search } = req.query;
    const skip = (page - 1) * limit;

    let query = { status: 'active' };

    if (genre && genre !== 'all') {
      query.genre = genre;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const books = await Book.find(query)
      .populate('uploadedBy', 'email')
      .sort({ uploadedAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Book.countDocuments(query);

    const booksWithUrls = books.map(book => ({
      ...book.toObject(),
      coverImage: `/uploads/covers/${path.basename(book.coverImage)}`,
      bookFile: `/uploads/books/${path.basename(book.bookFile)}`
    }));

    res.json({
      success: true,
      books: booksWithUrls,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalBooks: total,
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    });
  } catch (err) {
    console.error('Error fetching books:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch books' });
  }
});

// Get single book
app.get('/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('uploadedBy', 'email');
    
    if (!book) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }

    // Increment view count
    await Book.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } });

    const bookWithUrls = {
      ...book.toObject(),
      coverImage: `/uploads/covers/${path.basename(book.coverImage)}`,
      bookFile: `/uploads/books/${path.basename(book.bookFile)}`
    };

    res.json({ success: true, book: bookWithUrls });
  } catch (err) {
    console.error('Error fetching book:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch book' });
  }
});

// Download book (increment download count)
app.get('/download/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    
    if (!book) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }

    // Increment download count
    await Book.findByIdAndUpdate(req.params.id, { $inc: { downloads: 1 } });

    // Send file
    const filePath = path.resolve(book.bookFile);
    if (fs.existsSync(filePath)) {
      res.download(filePath, `${book.title}.pdf`);
    } else {
      res.status(404).json({ success: false, message: 'File not found' });
    }
  } catch (err) {
    console.error('Error downloading book:', err);
    res.status(500).json({ success: false, message: 'Failed to download book' });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File too large. Maximum size is 50MB.'
      });
    }
  }
  
  console.error('Unhandled error:', error);
  res.status(500).json({
    success: false,
    message: error.message || 'Internal server error'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));