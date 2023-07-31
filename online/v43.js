// Search API in NodeJS with MongoDB

const express = require('express');

require('./config');

const products = require('./products');

const app = express();

app.use(express.json());

app.get('/search/:key',async (req,resp) => {

    let data = await products.find(

        {
            "$or":[
                {"name":{$regex:req.params.key}},
                {"brand":{$regex:req.params.key}},
                {"category":{$regex:req.params.key}}
            ]
        }

    )
    console.log(data);
    resp.send(data);

})

app.listen(4060);