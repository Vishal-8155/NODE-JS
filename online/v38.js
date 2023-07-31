// NodeJS DELETE API Method

const express = require('express');

const dbConnect = require('./mongodb');

const mongodb = require('mongodb');

const app = express();

app.use(express.json());

app.get('/',async(req,resp) => {

    let data = await dbConnect();
    let result = await data.find().toArray();
    resp.send(result);

})

app.post('/',async(req,resp) => {

    let data = await dbConnect();
    let result = await data.insertOne(req.body);
    resp.send(result);
    
})

app.put('/',async(req,resp) => {

    let data = await dbConnect();
    let result = await data.updateOne(

        {name: 'iphone 11 pro max'},
        {$set: req.body}

    )
    resp.send(result);

})

app.delete('/:id',async(req,resp) => {

    let data = await dbConnect();
    let result = await data.deleteOne({_id:new mongodb.ObjectId(req.params.id)});
    console.log(result);
    resp.send(result);

})

app.listen(8090);