
const express = require('express');
const path = require('path');

const app = express();

const publicpath = path.join(__dirname,'practice');

app.get('',(req,res) => {

    res.sendFile(`${publicpath}/index.html`);

})

app.get('/about',(req,res) => {

    res.sendFile(`${publicpath}/about.html`);

})

app.get('/contact',(req,res) => {

    res.sendFile(`${publicpath}/contact.html`);

})

app.get('*',(req,res) => {

    res.sendFile(`${publicpath}/404.html`);

})

app.listen(7030);