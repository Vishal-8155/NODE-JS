// Events And Events Emitter in NodeJs 

const express = require('express');

const EventEmitter = require('events');

const app = express();

const event = new EventEmitter();

let count =0;

event.on("countAPI",() => {

    count++;

    console.log(`event called ${count}`);

})

app.get('/', (req, res) => {

    res.send("API Called");
    event.emit("countAPI");

})

app.listen(6000);