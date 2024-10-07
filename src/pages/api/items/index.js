// import connection from '../../../lib/mysql';
import connection from '../../../../lib/mysql';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { title, description } = req.body;
        const [result] = await connection.query('INSERT INTO items (title, description) VALUES (?, ?)', [title, description]);
        const newItem = { id: result.insertId, title, description };
        return res.status(201).json(newItem);
    } else if (req.method === 'GET') {
        const [items] = await connection.query('SELECT * FROM items');
        return res.status(200).json(items);
    } else {
        return res.status(405).end(); // Method Not Allowed
    }
}
