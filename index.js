const express = require('express');
const cors = require('cors');
require('dotenv').config();

const quotationRoutes = require('./src/routes/quotationRoutes');
const userRoutes = require('./src/routes/userRoutes');
const installerRoutes = require('./src/routes/installerRoutes');

const app = express();

// Parse multiple CORS origins from environment variable
// const corsOrigins = process.env.CORS_ORIGINS 
//     ? process.env.CORS_ORIGINS.split(',').map(origin => origin.trim())
//     : ['http://localhost:5173', 'http://localhost:3000'];
const corsOrigins = process.env.CORS_ORIGINS === "*"
  ? true
  : process.env.CORS_ORIGINS?.split(',').map(o => o.trim());

console.log("cors origin", corsOrigins);

// Middleware
app.use(cors({
    origin: true,
    //corsOrigins,
    credentials: true,
    methods: ["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
    allowedHeaders: ["Content-Type","Authorization"]
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Routes
app.use('/api/quotations', quotationRoutes);
app.use('/api/users', userRoutes);
app.use('/api/installers', installerRoutes);

// Basic health check
app.get('/', (req, res) => {
    res.json({ message: 'AE Renewable API is running' });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
