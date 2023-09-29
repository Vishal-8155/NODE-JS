const express = require('express');
const model = require('../models/categoryModel');

const app = express();
// const bodyParser = require('body-parser');
app.use(express.json());
let editcat=  '';
const categoryData =async (req,res)=>{
    const getAllCat = await model.find();
    console.log(getAllCat);

    res.render('category',{
                    username: req.cookies.UserName,
                    getAllCat: getAllCat,
                    message2:'',
                    editcat:''
            });
} 
const savecat = async (req,res)=>{
    let getAllCat = await model.find();
    let len = getAllCat.length+1;
    const catname = req.body.catname;
    const checkName = await model.findOne({catname:catname})
    
    if(checkName){
        
            req.flash('success', 'Category already exists');
            res.render('category',{
                username: req.cookies.UserName,
                getAllCat: getAllCat,
                message2: req.flash('success'),
                editcat:''
            });
    } else {
        const result = {
            id: len,
            catname: catname
        }
        const savedata = new model(result);
        await savedata.save();
        getAllCat = await model.find();
        req.flash('success', 'Category added successfully');
        res.render('category',{
            username: req.cookies.UserName,
            getAllCat: getAllCat,
            message2: req.flash('success'),
            editcat:''
        }); 
    }
    

}

const deleteCatData = async (req,res)=>{
    const id = req.params.id;
    const data = await model.findByIdAndRemove({_id: id});
    if(data){
        res.redirect('/admin/category')
    }

}

const editCatData = async (req,res)=>{
    const id = req.params.id;
    getAllCat = await model.find();
    editcat = await model.findOne({_id: id});
    if(editcat){
        res.render('category',{
            username: req.cookies.UserName,
            getAllCat: getAllCat,
            message2: '',
            editcat:editcat
        }); 
    }

}
const updatecat = async (req,res)=>{
    const id = req.params.id
    const catname = req.body.catname;
    const result = await model.findByIdAndUpdate({
            _id:id
    },
        {$set:{
            catname:catname
        }
    }
    )
    getAllCat = await model.find();
    req.flash('success', 'Category updated successfully');
    if(result){
        res.render('category',{
            username: req.cookies.UserName,
            getAllCat: getAllCat,
            message2: req.flash('success'),
            editcat:''
        }); 
    }

}

module.exports = {categoryData,savecat,deleteCatData,editCatData,updatecat};