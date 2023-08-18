const mongoose = require('mongoose');

const data = async () => {

    const url = 'mongodb://127.0.0.1:27017/adminpanel';
    await mongoose.connect(url);

};

data();

const user = new mongoose.Schema({

    id: Number,
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: String

}) 

const model = new mongoose.model('users',user);

module.exports = model;
