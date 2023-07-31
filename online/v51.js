// NodeJS PUT API with MySQL

const express = require('express');

const con = require('./mysql');

const app = express();

app.use(express.json());

app.get('/',(req, res) => {

    con.query(`select * from demo`,(err, result) => {

        if(err){
            res.send("error");
        }else{
            res.send(result);
        }

    })

})

app.post('/',(req, res) => {

    const data = req.body;
    con.query(`INSERT INTO demo SET ?`,data ,(err, result, fields) => {

        if(err) err;
        res.send(result); 

    })

});

app.put('/:id',(req, res) => {

    const data =[req.body.name,req.body.surname,req.body.roll,req.params.id];
    con.query(`UPDATE demo SET name = ?, surname = ?, roll = ? where id = ?`,data,(err, result, fields) => {

        if(err) err;
        res.send(result); 

    })

})

app.listen(6080);
















