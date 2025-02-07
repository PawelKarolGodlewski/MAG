const express = require('express');
const mysql = require('mysql');

const app = express();

const dbConfig = require('./db-config');
const db = mysql.createConnection(dbConfig);

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL delete-post-service');
});

app.delete('/posts/:id', (req, res) => {
    const postId = req.params.id;
    const query = 'DELETE FROM posts WHERE id = ?';
    db.query(query, [postId], (err, result) => {
        if (err) throw err;
        res.send(`Post deleted with ID: ${postId}`);
    });
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    console.log(`delete-post-service running on port ${PORT}`);
});
