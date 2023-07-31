// CRUD with Mongoose

const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/e-comm");
const productSchema = new mongoose.Schema({

    name: String,
    price: Number,
    brand: String,
    category: String

});

const saveInDB = async () => {

    const Product = mongoose.model("products", productSchema);
    let data = new Product({

            name: "m20",
            price: 1100,
            brand: "max",
            category: "mobile"

        });
    let result = await data.save();
    console.log(result);

}

// saveInDB();

const updateInDB = async () => {

    const Product = mongoose.model("products", productSchema);
    let data = await Product.updateOne(

            {name:'m10'},
            {
                $set:{name:'m20',price:333}
            }

        );
    console.log(data);

}

// updateInDB();

const deleteInDB = async () => {

    const Product = mongoose.model("products", productSchema);
    let data = await Product.deleteMany({name:"m10"});
    console.log(data);

}

// deleteInDB();

const findInDB = async () => {

    const Product = mongoose.model("products", productSchema);
    let data = await Product.find({name:"m10"});
    console.log(data);

}

// findInDB();


