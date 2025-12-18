const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// =====================
// MongoDB Atlas Connection
// =====================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Atlas Connected'))
  .catch(err => console.log('MongoDB Connection Error:', err));

// =====================
// User Schema
// =====================
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// =====================
// Product Schema
// =====================
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', productSchema);

// =====================
// Auth Routes
// =====================

// Register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// =====================
// Product Routes
// =====================

// Get all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Seed products (run once)
app.post('/api/products/seed', async (req, res) => {
  try {
    await Product.deleteMany({});

    const products = [
      {
        name: 'MacBook Pro',
        price: 129999,
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
        description: 'Powerful laptop for professionals'
      },
      {
        name: 'iPhone 15 Pro',
        price: 134900,
        image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400',
        description: 'Latest iPhone with advanced features'
      },
      {
        name: 'AirPods Pro',
        price: 24900,
        image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400',
        description: 'Premium wireless earbuds'
      }
    ];

    await Product.insertMany(products);
    res.json({ message: 'Products seeded successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// =====================
// Server Start
// =====================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
