const express = require('express');
const subcatModel = require('../models/subcategorymodel');
const categoryModel = require('../models/categorymodel');
const productModel = require('../models/productmodel');
const app = express();
app.use(express.json());

const productdata = async (req, res) => {
    const catdata = await categoryModel.find();
    res.render('product', { username: req.cookies.UserName, userimage: req.cookies.image, selected: 'product', maincat: catdata, productedit: '', pdata: [] });
}

// insert product data

const allproductdata = async (req, res) => {
    let id = req.params.id;
    const cat_id = req.body.cat_id;
    const sub_id = req.body.sub_cat_id;
    const pname = req.body.pname;
    const price = req.body.price;
    const description = req.body.detail;
    var image = [];
    if (req.files !== undefined) {
        /*if (req.file.filename !== undefined) {
            image = req.file.filename;
        }*/
        req.files.forEach(element => {
            image.push(element.filename);
        });
    }
    const productinfo = await productModel.findOne({ _id: id });
    console.log(productinfo);
    if (productinfo) {  
        if(image.length > 0) {
            if(productinfo.image.length > 0) {
                image = image.concat(productinfo.image); 
            }
        }else
        {
            image = productinfo.image; 
        }
        const presult = await productModel.findByIdAndUpdate({ _id: id }, {
            $set: {
                cat_id: cat_id,
                sub_id: sub_id,
                pname: pname,
                price: price,
                description: description,
                image: image
            }
        })
    } else {

        const result = {
            pname: pname,
            price: price,
            description: description,
            image: image,
            cat_id: cat_id,
            sub_id: sub_id,

        }
        const savedata = new productModel(result);
        await savedata.save();


    }
    res.redirect('/productDisplay');
    
}

// product display data in product table

const productDisplay = async (req, res) => {
    let catData = await categoryModel.find();

    const productdata = await productModel.find().populate(["cat_id", "sub_id"]);
  
    res.render('ptable', {
        username: req.cookies.UserName,
        productdata: productdata,
        catData: catData,
        userimage: req.cookies.image,
        selected: 'ptable',
        productedit: '',
        maincat: catData,
        pdata: ''

    });

}

const productDelete = async (req, res) => {
    const id = req.params.id;
    const data = await productModel.findByIdAndRemove({ _id: id });
    res.redirect('/productDisplay');
}

const productEdit = async (req, res) => {
    const id = req.params.id;
    const catData = await categoryModel.find();
    const result = await productModel.findOne({ _id: id});

    console.log(result);
    const subcatdata = await subcatModel.find({ cat_id: result.cat_id }).populate("cat_id");
    console.log(subcatdata);
    res.render('product', {
        username: req.cookies.UserName,
        productdata: '',
        catData: catData,
        userimage: req.cookies.image,
        selected: 'producttable',
        productedit: result,
        maincat: catData,
        pdata: subcatdata

    });
}

const ajax_productdetail = async (req, res) => {
    let id = req.query.product_id;
    const result = await productModel.findOne({_id: id});
    res.json(result);
}

const productImageDelete =  async(req,res) =>{
    const product_id = req.params.id;
    const imageidx = req.params.image_idx;
 
    var orgdata = await productModel.findOne({_id: product_id});
    orgdata.image.splice(imageidx,1);
    const product_data = await productModel.updateOne({_id:product_id},{$set:{image:orgdata.image}});
    res.redirect('/productEdit/'+product_id);
}

module.exports = { productdata, allproductdata, productDisplay, productDelete, productEdit,ajax_productdetail,productImageDelete }