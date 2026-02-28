const pool = require('./src/config/db');

const initDb = async () => {
    try {
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS users (
                id VARCHAR(36) PRIMARY KEY,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                full_name VARCHAR(255) NOT NULL,
                role ENUM('admin', 'staff') DEFAULT 'admin',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        await pool.execute(`
            CREATE TABLE IF NOT EXISTS quotations (
                id VARCHAR(36) PRIMARY KEY,
                full_name VARCHAR(255) NOT NULL,
                contact VARCHAR(255) NOT NULL,
                address TEXT NOT NULL,
                quote_ref VARCHAR(50) NOT NULL,
                results JSON NOT NULL,
                inputs JSON NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        console.log('Database tables initialized successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error initializing database:', error);
        process.exit(1);
    }
};

initDb();
