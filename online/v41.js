// POST API with Mongoose

const express = require('express');

require('./config');

const products = require('./products');

const app = express();

app.use(express.json());

app.post('/create',async (req,resp) => {

    const data = new products(req.body);
    let result = await data.save();
    console.log(result);
    resp.send(result);

})

app.listen(4040);