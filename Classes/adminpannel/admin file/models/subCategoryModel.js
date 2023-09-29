const mongoose = require('mongoose');

const data = async () => {

    const url = 'mongodb://127.0.0.1:27017/adminpanel';
    await mongoose.connect(url);

};

data();

const subCategory = new mongoose.Schema({
    name: String,
    cat_id: { type: mongoose.Schema.Types.ObjectId, ref: 'category' }
  });

const submodel = new mongoose.model('subcategory',subCategory);

module.exports = submodel;
