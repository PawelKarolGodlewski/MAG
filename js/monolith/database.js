const mysql = require('mysql');

const connection = mysql.createConnection({
    host: '192.168.2.222',
    user: 'monolith',
    password: 'pass1234',
    database: 'mag'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database.');
});

module.exports = connection;
