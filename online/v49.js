// NodeJS GET API with MySQL

const express = require('express');

const con = require('./mysql');

const app = express();

app.get('/',(req, res) => {

    con.query(`select * from demo`,(err, result) => {

        if(err){
            res.send("error");
        }else{
            res.send(result);
        }

    })

})

app.listen(5000);