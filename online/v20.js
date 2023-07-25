// Render HTML and JSON

const express = require('express');
const app = express();

app.get('',(req,res) => {

    res.send(`<h1>This is Home Page<h1><a href="/about">Go to About Page</a>`);

})

app.get('/about',(req,res) => {

    res.send(`
    <input type="text" placeholder="User name" value="${req.query.name}" />
    <button>Click Me</button><br><br><br>
    <a href="/">Go to Home Page</a>`);

})



app.get('/contact',(req,res) => {

    res.send([
        {
            name:'vishal',
            age: 19
        },
        {
            name:'Azim',
            age: 20
        }
    ]);

})

app.listen(8000);