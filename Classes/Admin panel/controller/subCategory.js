const express = require('express');
const subModel = require('../model/subCategoryModel');
const model = require('../model/Categorymodel');

const app = express();
app.use(express.json());
let editsCate = '';

const categoryInfo = async (req, res) => {
    const AllCategory = await model.find();

    res.render('category', {
        usNames: req.cookies.Username,
        AllCategory: AllCategory,
        message2: '',
        editsCate: ''
    });
}

const saveSubCategory = async (req, res) => {
    let AllCategory = await subModel.find();
    const subCatName = req.body.subCatName;
    const id = req.body.Cat_id;
    const checkName = await subModel.findOne({ subCatName: subCatName });
    const result = {
        Cat_id: id,
        subCatName: subCatName
    }
    const saveData = new subModel(result);
    await saveData.save();
    AllCategory = await subModel.find();
    res.redirect('/subCategoryAll');
}

const deleteSubCate = async (req, res) => {
    console.log(req.params.id);
    const id = req.params.id;
    const result = await subModel.findByIdAndDelete({ _id: id });
    res.redirect('/subCategoryAll');
}

const editSubCate = async (req, res) => {
    const id = req.params.id;
    const cData = await model.find();
    const sData = await subModel.find().populate("Cat_id");
    result = await subModel.findOne({ _id: id });
    res.render('subCategory', {
        usNames: req.cookies.Username,
        AllCategory: sData,
        message2: '',
        editsCate: result,
        cData: cData
    })
}

const updateSubCate = async (req, res) => {
    let AllCategory = await subModel.find();
    const subCatName = req.body.subCatName;
    const id = req.body.Cat_id;
    const subCatId = req.params.id;

    const result = await subModel.findByIdAndUpdate({ _id: subCatId }, {
        $set: {
            subCat_id: id,
            subCatName: subCatName
        }
    })
    console.log("Subcategory Updated.");
    res.redirect('/subCategoryAll');
}

const AllSubCate = async (req, res) => {
    const cData = await model.find();
    const sData = await subModel.find().populate("Cat_id");
    res.render('subCategory', {
        usNames: req.cookies.Username,
        AllCategory: sData,
        message2: '',
        editsCate: '',
        cData: cData
    })
}

const abcAllData = async (req, res) => {
    let cat_id = req.query.selectedValue;
    let subData;
    if(cat_id != '') {
        subData =  await subModel.find({Cat_id:cat_id}).populate("Cat_id");
    }
    else {
        subData =  await subModel.find().populate("Cat_id");
    }

    res.json(subData);
}

module.exports = { saveSubCategory, AllSubCate, deleteSubCate, editSubCate, abcAllData, updateSubCate };

// req.params.id is for get method (jyare aapne url mathi(get method through) data levana hoy tyare req.params.id no use thay )

// req.body.is is for post method (jyare aapne url mathi(post method through) data levana hoy tyare req.body.id no use thay )
