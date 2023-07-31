// GET,DELETE and PUT API method with mongoose

const express = require('express');

require('./config');

const products = require('./products');

const app = express();

app.use(express.json());

app.post('/create', async (req, resp) => {

    const data = new products(req.body);
    let result = await data.save();
    console.log(result);
    resp.send(result);

})

app.get('/list', async (req, resp) => {

    const data = await products.find();
    resp.send(data);

})

app.delete('/delete/:_id', async (req, resp) => {

    const data = await products.deleteMany(req.params);
    console.log(data);
    resp.send(data);

})

app.put('/update/:_id', async (req, resp) => {

    const data = await products.updateOne(

        req.params,
        {
            $set: req.body
        }

    );

    resp.send(data);

})

app.listen(4050);