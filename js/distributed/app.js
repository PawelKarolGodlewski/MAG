const express = require('express');
const mysql = require('mysql');
const cluster = require('cluster');
const os = require('os');

const numCPUs = os.cpus().length;

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
    });
} else {
    const pool = mysql.createPool({
        host: '192.168.2.222',
        user: 'distributed', 
        password: 'pass1234',  
        database: 'mag',
        port: '3306',
        connectTimeout  : 60 * 60 * 1000,
        acquireTimeout  : 60 * 60 * 1000,
        timeout         : 60 * 60 * 1000,
        connectionLimit: 1100
    });

    const app = express();
    const PORT = process.env.PORT || 3000;

    app.use(express.json());

    app.get('/posts', (req, res) => {
        const categoryId = req.query.categoryId;
        let query = 'SELECT * FROM posts';
        if (categoryId) {
            query += ` WHERE category_id = ${parseInt(categoryId)}`;
        }

        pool.getConnection((err, connection) => {
            if (err) throw err;

            connection.query(query, (error, results) => {
                connection.release();
                if (error) return res.status(500).send(error);
                res.json(results);
            });
        });
    });

    app.post('/posts', (req, res) => {
        const { title, content, category_id } = req.body;
        pool.getConnection((err, connection) => {
            if (err) throw err;

            connection.query(
                'INSERT INTO posts (title, content, category_id) VALUES (?, ?, ?)',
                [title, content, category_id],
                (error, results) => {
                    connection.release();
                    if (error) return res.status(500).send(error);
                    res.json({ id: results.insertId, title, content, category_id });
                }
            );
        });
    });

    app.delete('/posts/:id', (req, res) => {
        const postId = req.params.id;
        pool.getConnection((err, connection) => {
            if (err) throw err;

            connection.query(
                'DELETE FROM posts WHERE id = ?',
                [postId],
                (error, results) => {
                    connection.release();
                    if (error || results.affectedRows === 0) return res.status(404).send('Post not found');
                    res.sendStatus(204);
                }
            );
        });
    });

    app.listen(PORT, () => {
        console.log(`Worker ${process.pid} started on port ${PORT}`);
    });
}
