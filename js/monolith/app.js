const express = require('express');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const mysql = require('mysql');
const dbconf = require('./database');

if (cluster.isMaster) {
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
        cluster.fork(); 
    });
} else {
    const pool = mysql.createPool({
        ...dbconf,
        connectionLimit: 10
    });

    const PORT = process.env.PORT || 3000;
    const app = express();
    app.use(express.json());

    const postsRoutes = require('./postsRoutes');
    app.use('/posts', postsRoutes);

    app.listen(PORT, () => {
    	console.log(`Server is running on port ${PORT}`);
    });

    module.exports = app;
}
