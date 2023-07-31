// form

const express = require('express');

const app = express();

const path = require('path');

const mainpath = path.join(__dirname, '../folder1');
app.use(express.static(mainpath));

app.get('/', (req, res) =>{

    res.write("<h1>Home Page</h1>");
    res.write("<h1>My first Home Page</h1>");
    res.send();

});

app.get('/user',(req,res)=>{

    console.log(mainpath);
    res.sendFile(`${mainpath}/lecture7.html`);

})

app.get('/savedata',(req,res)=>{

    res.write(`Name is ${req.query.name} And `);
    res.write(`Email is ${req.query.email}`);
    res.send();

});

app.listen(8000);
