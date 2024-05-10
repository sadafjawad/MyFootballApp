const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middleware/authMiddleware');
const cors = require('cors');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.json());

// Use CORS middleware
app.use(cors());

// Routes
// app.use('/api/auth', authRoutes);
app.use('/', authRoutes);

// Protected route
app.get('/api/protected', authMiddleware, (req, res) => {
    res.json({ message: 'Protected route accessed successfully' });
});

// Test server
// app.get('/', authMiddleware, (req, res) => {
//     res.json({ message: 'welcome to the server' });
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
