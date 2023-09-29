const mongoose = require("mongoose");

const pqr = async () => {
    const url = "mongodb://127.0.0.1:27017/student";
    await mongoose.connect(url);
};

pqr();

const subCategory = new mongoose.Schema({
    subCatName: String,
    Cat_id: { type: mongoose.Schema.Types.ObjectId, ref: 'InfoCat' }
});

const subModel = new mongoose.model("SubCategory", subCategory);

module.exports = subModel;
