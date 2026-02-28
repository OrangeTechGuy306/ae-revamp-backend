const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

class User {
    static async create({ email, password, full_name, role = 'admin' }) {
        const id = uuidv4();
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await pool.execute(
            'INSERT INTO users (id, email, password_hash, full_name, role) VALUES (?, ?, ?, ?, ?)',
            [id, email, hashedPassword, full_name, role]
        );
        return { id, email, full_name, role };
    }

    static async findByEmail(email) {
        const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    }

    static async findById(id) {
        const [rows] = await pool.execute('SELECT id, email, full_name, role, created_at FROM users WHERE id = ?', [id]);
        return rows[0];
    }

    static async findAll() {
        const [rows] = await pool.execute('SELECT id, email, full_name, role, created_at FROM users ORDER BY created_at DESC');
        return rows;
    }

    static async delete(id) {
        const [result] = await pool.execute('DELETE FROM users WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
}

module.exports = User;
