// create server (core module)

const http = require('http');

http.createServer((reqest,response) => {

    response.write("Hello I am Vishal Chavda");
    response.end();

}).listen(4500);

