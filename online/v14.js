// CRUD with file system

const fs = require('fs');

const path = require('path');

const dirpath = path.join(__dirname,'crud');

const filepath = `${dirpath}/apple.txt`;

fs.writeFileSync(filepath,`This is a simple text file`);

fs.readFile(filepath,'utf8',(err, data) => {

    console.log(data);

})

fs.appendFile(filepath,` and file name is apple.txt`,(err) => {

    if(!err) console.log('file is updated');

})

fs.readFile(filepath,'utf8',(err, data) => {

    console.log(data);

})
fs.rename(filepath,`${dirpath}/fruit.txt`,(err) => {

    if(!err) console.log('file name is updated');

})

// fs.unlinkSync(`${dirpath}/fruit.txt`);