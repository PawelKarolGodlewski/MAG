const express = require('express');
const mysql   = require('mysql2');

const app = express();
const port = 3000;

//database connection
const connection = mysql.createConnection({
  host: '192.168.1.17',
  user: 'distributed',
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
    	//console.log(results);
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
		//console.log(result.insertId);
  	});
});

// Start the server
app.listen(port, () => {
  console.log(`Distributed nasłuchuje na porcie: ${port}`);
});