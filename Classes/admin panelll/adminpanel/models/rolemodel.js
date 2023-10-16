const mongoose = require('mongoose');
const roleSchema = new mongoose.Schema({

    rolename:String,
    isActive:Boolean,
});


const roleModel = new mongoose.model('roles',roleSchema);
module.exports = roleModel;