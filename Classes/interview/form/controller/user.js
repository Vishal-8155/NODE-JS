const { ObjectId } = require('mongodb');
const { model } = require('../models/mongoosedb');
const express = require('express');

const app = express();
app.use(express.json());

const form = async (req, res) => {

    const udata = await model.find({});

    res.render('form', { getAlldata: udata, editdata: "" });

}

const validate = async (req, res) => {

    const { relationship, name, date, address, pincode, city, state, country } = req.body;

    let data = new model({

        id:10,
        relationship: relationship,
        name: name,
        date: date,
        address: address,
        pincode: pincode,
        city: city,
        state: state,
        country: country

    })

    await data.save();
    const udata = await model.find({});
    res.render('form', { getAlldata: udata, editdata: "" });

}

const edituser = async (req, res) => {

    const {relationship, name, date, address, pincode, city, state, country} = req.body;
    const id = req.params.id;
    const findData = await model.findOne({_id: new ObjectId(id)});
    const relationshipp = relationship;
    const namee = name;
    const datee = date;
    const addresss = address;
    const pincodee = pincode;
    const cityy = city;
    const statee = state;
    const countryy = country; 
    const result = await submodel.updateOne({_id: new ObjectId(id)},{
        $set:{
            relationship: relationshipp,
            name: namee,
            date: datee,
            address: addresss,
            pincode: pincodee,
            city: cityy,
            state: statee,
            country: countryy,
        }
    })
    const udata = await model.find({});
    res.render('form',{ getAlldata: udata,editdata:findData})

}

const deletedata = async (req, res) => {

    const id = req.params.id;
    console.log(id)
    const data = await model.deleteOne({ _id: new ObjectId(id) });
    const udata = await model.find({});

    res.render('form', { getAlldata: udata, editdata: "" })

}

module.exports = { form, validate, edituser, deletedata };