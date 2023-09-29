// const a = require('./object')

// const {abc,xyz,pqr} = a
const {abc,xyz,pqr} =require('./object')

console.log("name is "+abc.name);
console.log("name is "+xyz.name);

for(let i=0;i<pqr.length;i++){
    console.log("array is "+pqr[i]);

}

//npm install express
//npm install mongoose


