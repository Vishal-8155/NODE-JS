const mongoose = require('mongoose');
const mainData = async () => {
    const url = "mongodb://127.0.0.1:27017/student";
    const connect1 = await mongoose.connect(url);
    console.log('connected');
}

mainData();

const studentSchema = new mongoose.Schema({
    id: Number,
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: String
});

const FormIm = new mongoose.model("Info20", studentSchema);

module.exports = FormIm;