let a = {

    name:"Vishal",
    age:19,
    sayhello: () => {
        console.log("a calling...");
    }

}

let b = {

    name:"Azim",
    age:21,
    sayhello: () => {
        console.log("b calling...");
    }

}

module.exports = {

    a:a,
    b:b

} 