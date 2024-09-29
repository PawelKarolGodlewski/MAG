const cluster = require('cluster');
const express = require('express');
const numCPUs = require('os').cpus().length;
const mysql   = require('mysql2');

const app = express();
const port = 3000;

//database connection
const connection = mysql.createConnection({
  host: '192.168.1.17',
  user: 'loadbalancer',
  password: '1234',
  database: 'archi'   
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL!');
});


//API endpoints
app.get('/a', (req, res) => {
	connection.query('SELECT * FROM trans', (err, results) => {
	if (err) throw err;
	res.json(results);
    	console.log(results);
  });
});

app.get('/b', (req, res) => {
	//const { val, buy, sell } = req.body;

	const names = ['EUR','PLN','USD','GBP','JPY','HKD','CAD','CHF','THB', 'NOK'];
	var val = names[Math.floor(Math.random() * names.length)];
	var buy = Math.floor(Math.random() * (1000 - 1) )/100;
	var sell = buy + 0.2;


  	connection.query('INSERT INTO trans (val, buy, sell) VALUES (?, ?, ?)', [val, buy, sell], (err, result) => {
    		if (err) throw err;
    		res.status(201).json({ id: result.insertId });
		console.log(result.insertId);
  	});
});


if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    cluster.fork()
  });

} else {
  app.listen(port, () => {
    console.log(`Server Worker ${process.pid} started`);
  });
}