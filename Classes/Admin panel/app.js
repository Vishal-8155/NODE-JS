const express = require('express');
const cookie = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const app = express();
app.use(cookie());

app.use(session({
    secret:'remote',
    saveUninitialized: true,
    resave: true
}))

app.use(flash());
const router = require('./routes/userRoute');
app.use(router);
const bodyPs = require('body-parser');

app.use(bodyPs.urlencoded({ extended: false }))

app.set('view engine', 'ejs');
app.use(express.static(__dirname));

app.get('/logout', (req, res) => {
    res.clearCookie('Username');
    res.render('login',{message:''});
});

app.get('/admin/category', (req, res) => {
    res.redirect('category');
});

app.listen(4500, () => { 
    console.log('Port Listening on 4500....');
});

