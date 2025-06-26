const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('./_config.js');

// Define routes
let index = require('./routes/index');
let image = require('./routes/image');

// Environment setup
const env = process.env.NODE_ENV || 'development';
const mongoURI = config.mongoURI[env];

if (!mongoURI) {
    console.error(`Mongo URI not found for environment: ${env}`);
    process.exit(1);
}

// Database connection
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connected to Mongo DB Atlas"))
.catch((err) => console.error("Failed to connect:", err.message));

let db = mongoose.connection;
db.once('open', () => {
    console.log("Database connected successfully");
});
db.on('error', (err) => console.error('Database connection error:', err));

// Initialize app
const app = express();

// View engine
app.set('view engine', 'ejs');

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(express.json());

// Routes
app.use('/', index);
app.use('/image', image);

// Start server if not being required
if (require.main === module) {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server is listening at http://localhost:${PORT}`);
    });
}

module.exports = app;
