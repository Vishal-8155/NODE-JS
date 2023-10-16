const mongoose = require('mongoose');

 const productSchema = new mongoose.Schema({
         pname: String,
         price: Number,
         description: String,
         image: Array,
         cat_id:{type: mongoose.Schema.Types.ObjectId, ref:'categories'},
         sub_id:{type: mongoose.Schema.Types.ObjectId, ref:'subcategories'}
   });

 const productModel = new mongoose.model('products',productSchema);
 module.exports = productModel