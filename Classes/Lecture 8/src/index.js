const express = require('express');
const app = express();
const path = require('path');
const body = require('body-parser');
// extended false - string & array
// extended true - object & json format
const bodyParse = body.urlencoded({extended: false});

const mainPath = path.join(__dirname, '../public');
app.use(express.static(mainPath));

app.get('/', (req, res) =>{
    res.write("<h1>Home Page</h1>");
    res.write("<h2>My First Page</h2>");
    res.send();
})

// POST METHOD

app.get('/user',(req,res) => {
    // console.log(mainPath);
    res.sendFile(mainPath+'/'+'form.html');
})

app.post('/saveData',bodyParse,(req,res) => {
    res.write("<p>Name is " + req.body.name+"</p>");
    res.write("<p>Email is " + req.body.email+"</p>");
    res.send();
})

app.listen(7600,"127.0.0.1",() => {
    console.log('Listening successfully');
})