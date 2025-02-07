const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const dbConfig = require('./db-config');
const db = mysql.createConnection(dbConfig);

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL list-posts-service');
});

app.get('/posts', (req, res) => {
    const categoryId = req.query.categoryId;
    let query = 'SELECT * FROM posts';
    if (categoryId) {
        query += ` WHERE category_id = ${categoryId}`;
    }
    db.query(query, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`list-posts-service running on port ${PORT}`);
});
