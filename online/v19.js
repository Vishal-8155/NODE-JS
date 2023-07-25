// Routing Params - Request and Response

const express = require('express');
const a = express();

a.get('',(req,res) => {

    console.log('data sent by browser -->',req.query.name);
    res.send('Welcome ' + req.query.name);

})

a.listen(5000);