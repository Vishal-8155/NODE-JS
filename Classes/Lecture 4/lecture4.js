// create a server 

const http = require('http');

http.createServer((req,res) => {

    res.write("response send completely.");
    res.end();

}).listen(8000,"127.0.0.1",() => {

    console.log("listening port");

});

const a = require('./calc');

const {add,subtract,multiply,divide} = a;

console.log(add(10,20));

console.log(subtract(10,20));

console.log(divide(10,20));

console.log(multiply(10,20));



