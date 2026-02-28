const pool = require('../config/db');
const { v4: uuidv4 } = require('uuid');

class Quotation {
    
    static async create({ fullName, contact, address, quoteRef, results, inputs }) {
        const id = uuidv4();
        const [result] = await pool.execute(
            'INSERT INTO quotations (id, full_name, contact, address, quote_ref, results, inputs) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [id, fullName, contact, address, quoteRef, JSON.stringify(results), JSON.stringify(inputs)]
        );
        return { id, fullName, contact, address, quoteRef, results, inputs };
    }

    static async findAll() {
        const [rows] = await pool.execute('SELECT * FROM quotations ORDER BY created_at DESC');
        return rows.map(row => ({
            ...row,
            results: typeof row.results === 'string' ? JSON.parse(row.results) : row.results,
            inputs: typeof row.inputs === 'string' ? JSON.parse(row.inputs) : row.inputs
        }));
    }

    static async findById(id) {
        const [rows] = await pool.execute('SELECT * FROM quotations WHERE id = ?', [id]);
        if (rows.length === 0) return null;
        const row = rows[0];
        return {
            ...row,
            results: typeof row.results === 'string' ? JSON.parse(row.results) : row.results,
            inputs: typeof row.inputs === 'string' ? JSON.parse(row.inputs) : row.inputs
        };
    }

    static async delete(id) {
        const [result] = await pool.execute('DELETE FROM quotations WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
}

module.exports = Quotation;
