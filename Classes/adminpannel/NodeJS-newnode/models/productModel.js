const mongoose = require('mongoose');

const data = async () => {

    const url = 'mongodb://127.0.0.1:27017/adminpanel';
    await mongoose.connect(url);

};

data();

const product = new mongoose.Schema({
    name: String,
    cat_id: { type: mongoose.Schema.Types.ObjectId, ref: 'category' },
    subcat_id: { type: mongoose.Schema.Types.ObjectId, ref: 'subcategory' },
    price: Number,
    images : Array,
    description: String
  });

const prodmodel = new mongoose.model('product',product);

module.exports = prodmodel;
