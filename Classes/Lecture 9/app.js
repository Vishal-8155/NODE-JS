const express = require('express');

const app = express();

const user2 = require('./routes/user2');

app.use(user2);

app.get('/', (req, res) => {

    res.end('Welcome');

})

app.listen(8000)