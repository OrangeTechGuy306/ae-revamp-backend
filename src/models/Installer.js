const pool = require('../config/db');
const { v4: uuidv4 } = require('uuid');

class Installer {
    static async create({ full_name, phone, other_phone, address, photo_url, status = 'pending' }) {
        const id = uuidv4();
        const [result] = await pool.execute(
            'INSERT INTO installers (id, full_name, phone, other_phone, address, photo_url, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [id, full_name, phone, other_phone, address, photo_url, status]
        );
        return { id, full_name, phone, other_phone, address, photo_url, status };
    }

    static async findById(id) {
        const [rows] = await pool.execute('SELECT * FROM installers WHERE id = ?', [id]);
        return rows[0];
    }

    static async findAll() {
        const [rows] = await pool.execute('SELECT * FROM installers ORDER BY created_at DESC');
        return rows;
    }

    static async updateStatus(id, status) {
        const [result] = await pool.execute(
            'UPDATE installers SET status = ? WHERE id = ?',
            [status, id]
        );
        return result.affectedRows > 0;
    }

    static async delete(id) {
        const [result] = await pool.execute('DELETE FROM installers WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
}

module.exports = Installer;
