const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

const distrib = 'http://192.168.1.103:3000';

//API endpoints
app.get('/a', async (req, res) => {
	try{
		const response = await axios.get(distrib + '/a');
		res.json(response.data);
	} catch(error){
		res.status(500).send('error fetching data');
	}
});

app.get('/b', (req, res) => {
	try{
		const response = await axios.get(distrib + '/b');
		res.json(response.data);
	} catch(error){
		res.status(500).send('error fetching data');
	}
});

// Start the server
app.listen(port, () => {
  console.log(`Control node nasłuchuje na porcie: ${port}`);
});