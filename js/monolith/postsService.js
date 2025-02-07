const connection = require('./database');

exports.getAllPosts = async (category) => {
    return new Promise((resolve, reject) => {
        let query = 'SELECT * FROM posts';
        const params = [];

        if (category) {
            query += ' WHERE category_id = ?';
            params.push(category);
        }

        connection.query(query, params, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

exports.addPost = async (title, content, category_id) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO posts (title, content, category_id) VALUES (?, ?, ?)';
        connection.query(query, [title, content, category_id], (err, results) => {
            if (err) return reject(err);
            resolve(results.insertId);
        });
    });
};

exports.deletePost = async (id) => {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM posts WHERE id = ?';
        connection.query(query, [id], (err, results) => {
            if (err) return reject(err);
            resolve(results.affectedRows);
        });
    });
};
