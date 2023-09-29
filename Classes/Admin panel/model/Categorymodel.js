const mongoose = require("mongoose");

const pqr = async () => {
  const url = "mongodb://127.0.0.1:27017/student";
  await mongoose.connect(url);
};

pqr();

const category = new mongoose.Schema({
  id: Number,
  catName: {
    type: String,
    required: true,
    // unique: true
  },
});

const model = new mongoose.model("InfoCat", category);

module.exports = model;
