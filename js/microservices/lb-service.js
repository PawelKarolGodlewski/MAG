const express = require('express');
const httpProxy = require('http-proxy');

const app = express();

const listPostsProxy = httpProxy.createProxyServer({});
const addPostProxy = httpProxy.createProxyServer({});
const deletePostProxy = httpProxy.createProxyServer({});

let currentServiceIndex = 0;
const services = ['http://192.168.2.100:3001', 'http://192.168.2.100:3002', 'http://192.168.2.100:3003'];

function getNextService() {
    const service = services[currentServiceIndex];
    currentServiceIndex = (currentServiceIndex + 1) % services.length;
    return service;
}

app.get('/posts', (req, res) => {
    const target = services[0]; 
    console.log(`Proxying GET /posts to ${target}`);
    listPostsProxy.web(req, res, { target });
});

app.post('/posts', (req, res) => {
    const target = getNextService();
    console.log(`Proxying POST /posts to ${target}`);
    addPostProxy.web(req, res, { target });
});

app.delete('/posts/:id', (req, res) => {
    const target = getNextService();
    console.log(`Proxying DELETE /posts/${req.params.id} to ${target}`);
    deletePostProxy.web(req, res, { target });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`lb-service running on port ${PORT}`);
});
