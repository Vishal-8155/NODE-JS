

// console.warn("Vishal Chavda");
// console.error("Vishal Chavda");
const index2 = require('./index2');

console.log(index2);
console.log(index2.x);
console.log(index2.y);
console.log(index2.z());

const arr = [2,3,4,3,5,6,3,7,8];
arr.forEach(myfunc);

function myfunc(val) {
    console.warn(val);
}

let i = 0;

arr.filter((item)=>{
   
    if(item == 3){

        i++;

    }

});

console.log(`filter of 3 is ${i}`);

const fs = require('fs');
fs.writeFileSync("hello.txt","Hello vishal");

console.log(__dirname); // show a directory name 
console.log(__filename); // show a filename
