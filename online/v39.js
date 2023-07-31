// Mongoose with NodeJS

const mongoose = require('mongoose');

const main = async() => {

    await mongoose.connect("mongodb://127.0.0.1:27017/e-comm");
    const productSchema = new mongoose.Schema({

        name:String,
        price:Number

    });
    const productsModel = mongoose.model("products",productSchema);
    let data = productsModel({name:"m10",price:1000,category:"mobile"});
    let result = await data.save();
    console.log(result);

}

main();