const mysql = require('./database');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
    //for (let i = 0; i < numCPUs; i++) {
      for (let i = 0; i < 1; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
        cluster.fork(); // Restart the worker
    });
} else {
    const pool = mysql.createPool({
        ...mysql.connection,
        connectionLimit: 10
    });
    require('./app');
}

module.exports = function(req, res, next) {
    next();
};
