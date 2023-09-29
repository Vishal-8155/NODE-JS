const mongoose = require('mongoose');

const data = async () => {

    const url = 'mongodb://127.0.0.1:27017/adminpanel';
    await mongoose.connect(url);

};

data();

const category = new mongoose.Schema({

    id: Number,
    catname: {
        type: String,
        required: true,
        unique: true
    }
}) 

const model = new mongoose.model('category',category);

module.exports = model;
