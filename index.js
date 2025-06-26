const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Middleware
app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');

// MongoDB Atlas URI
const mongoURI = 'mongodb+srv://omwoyo:Nairobi2025@omwoyo.bjgaa4t.mongodb.net/?retryWrites=true&w=majority&appName=Omwoyo';

// Connect to MongoDB Atlas
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch(err => console.error('❌ MongoDB connection error:', err.message));

// Routes
app.get('/', (req, res) => {
  res.render('index', { title: 'MILESTONE 2' });
});

// Start server
const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
