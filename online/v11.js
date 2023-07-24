// Make a simple API

const http = require('http');
const data = require('./data');
const { json } = require('stream/consumers');
http.createServer((request,response) => {

    response.writeHead(200,{'Content-Type': 'application/json'});
    response.write(JSON.stringify(data));
    response.end();

}).listen(5000);