// Dynamic Page with ejs

const express = require('express');
const path = require('path');

const app = express();

const publicpath = path.join(__dirname,'public');

app.set('view engine','ejs');

app.get('',(req,res) => {

    res.sendFile(`${publicpath}/index.html`);

})

app.get('/about',(req,res) => {

    res.sendFile(`${publicpath}/about.html`);

})

app.get('/contact',(req,res) => {

    res.sendFile(`${publicpath}/contact.html`);

})

app.get('/profile',(req,res) => {

    const user = {
        name: 'vishal chavda',
        email: 'vishalchavda@gmail.com',
        city: 'Ahmedabad',
        skills: ['html','javascript','node','css','php','sql']
    }
    res.render('profile',{user});

})

app.get('/login',(req,res) => {

    res.render('login');

})

app.get('*',(req,res) => {

    res.sendFile(`${publicpath}/404.html`);

})

app.listen(8080);