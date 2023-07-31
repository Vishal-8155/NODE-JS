// NodeJS Connect with MySQL

const mysql = require('mysql');

const con = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sample'

})

con.connect((err) => {

    if(err){
        console.warn("error in connection");
    }else{
        console.log('Connected');
    }

});

con.query(`select * from demo`,(err, result) => {

    if(err){
        console.log(err);
    }else{
        console.log(result);    
    }

})