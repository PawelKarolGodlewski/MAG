const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const dbConfig = require('./db-config');
const db = mysql.createConnection(dbConfig);

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL add-post-service');
});

app.post('/posts', (req, res) => {
    const { title, content, categoryId } = req.body;
    const query = 'INSERT INTO posts (title, content, category_id) VALUES (?, ?, ?)';
    db.query(query, [title, content, categoryId], (err, result) => {
        if (err) throw err;
        res.send(`Post added with ID: ${result.insertId}`);
    });
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`add-post-service running on port ${PORT}`);
});
