// import connection from '../../../lib/mysql';
// import connection from '../../../../lib/mysql';
import connection from "../../../../lib/mysql";


export default async function handler(req, res) {
    const { id } = req.query;

    if (req.method === 'PUT') {
        const { title, description } = req.body;
        await connection.query('UPDATE items SET title = ?, description = ? WHERE id = ?', [title, description, id]);
        return res.status(200).json({ id, title, description });
    } else if (req.method === 'DELETE') {
        await connection.query('DELETE FROM items WHERE id = ?', [id]);
        return res.status(204).end(); // No Content
    } else {
        return res.status(405).end(); // Method Not Allowed
    }
}
