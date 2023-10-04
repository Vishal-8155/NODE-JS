const express = require('express');
const submodel = require('../models/subCategoryModel');
const model = require('../models/categoryModel');
const prodmodel = require('../models/productModel')
const fs = require('fs');

const app = express();
const bodyParser = require('body-parser');
// app.use(express.json());
app.use(bodyParser.json());

const products = async (req,res)=>{
    categoryData = await model.find();
    res.render('products',{
        catData: categoryData,
        username: req.cookies.UserName,
        message2:'',
        allproducts:''

    });
}
const getSubData = async (req, res)=>{
    let catid = req.query.selectedValue
    let data = await submodel.find({cat_id: catid})
    if(data){
        res.json(data);
    }
}

const saveproduct = async (req, res,next)=>{
    console.log(req.body)
    try {
        
        // to declare some path to store your converted image
        const path = '././images/'+Date.now()+'.png'

        console.log(req.body)
        const imgdata = req.body.image;
        if (!imgdata) {
            throw new Error('Invalid image data');
        }
        // to convert base64 format into random filename
        const base64Data = imgdata.replace(/^data:([A-Za-z-+/]+);base64,/, '');        
        fs.writeFileSync(path, base64Data,  {encoding: 'base64'});
        const result = {
            cat_id:req.body.cat_id,
            sub_id:req.body.sub_id,
            price:req.body.price,
            name:req.body.name,
            images:[base64Data]
        }

        const savedata = new prodmodel(result);
        await savedata.save();
        
    } catch (e) {
        next(e);
    }
}

module.exports = {products,getSubData,saveproduct};