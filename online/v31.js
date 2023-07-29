// Read Data from MongoDB

const dbConnect = require('./mongodb')

// second Method (Using Promise) & first method in #31 video (Using async await) 

// dbConnect().then((resp) => {

//     resp.find({}).toArray().then((data) => {

//         console.warn(data);

//     })

// })

// using first method (Like in use #31 video)

const main = async () => {

    let data = await dbConnect();
    let data2 = await data.find({}).toArray();
    console.log(data2);

}

main();