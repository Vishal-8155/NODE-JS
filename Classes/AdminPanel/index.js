const express = require('express');
const app = express();
const session = require('express-session');
const flash = require('connect-flash');
const cookie = require('cookie-parser');
app.use(cookie());
const passport = require('passport')
const localization = require("./middleware/localauth");

app.use(session({

    secret: 'flashblog',
    saveUninitialized: true,
    resave: true        

}))

localization(passport)
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.set('view engine', 'ejs');

app.use(express.static(__dirname));

const routes = require('./routes/route');

app.use(routes);

app.listen(5000, () => {
    console.log('listening on port 5000');
})

