const mongoose = require('mongoose');

 const subCategorySchema = new mongoose.Schema({
         name: String,
         cat_id:{type: mongoose.Schema.Types.ObjectId, ref:'categories'}
   });

 const subcatModel = new mongoose.model('subcategories',subCategorySchema);
 module.exports = subcatModel