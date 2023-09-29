const mongoose = require('mongoose');

const data = async () => {

    const url = 'mongodb://127.0.0.1:27017/formvalidation';
    await mongoose.connect(url);

};

data();

const user = new mongoose.Schema({

    id: Number,
    relationship: {
        type: String,
         required: true,
          unique: false
    },
    name: {
        type: String,
         required: true,
          unique: true
    },
    date: String,
    address: String,
    pincode:Number,
    city:String,
    state:String,
    country:String

}) 

const model = new mongoose.model('users',user);

module.exports = {model};
