const express = require('express');
const app = express();
const dbConnect = require('./models/mongoosedb');
// dbConnect();

app.set('view engine', 'ejs');

app.use(express.static(__dirname));

const routes = require('./routes/route');
app.use(routes);

app.listen(5000, () => {
    console.log('port 5000');
})