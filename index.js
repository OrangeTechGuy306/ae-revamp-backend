const express = require('express');
const cors = require('cors');
require('dotenv').config();

const quotationRoutes = require('./src/routes/quotationRoutes');
const userRoutes = require('./src/routes/userRoutes');

const app = express();

// Middleware
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/quotations', quotationRoutes);
app.use('/api/users', userRoutes);

// Basic health check
app.get('/', (req, res) => {
    res.json({ message: 'AE Renewable API is running' });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
