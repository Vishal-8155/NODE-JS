// Handle Asynchronous Data in NodeJS

let a=20;
let b=0;

const waitingdata = new Promise((resolve, reject) => {

    setTimeout(() => {

        resolve(30);

    },2000);

})

waitingdata.then((data) => {

    b = data;

    console.log(a + b);

})