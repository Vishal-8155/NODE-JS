const express = require('express');
const model = require('../model/Categorymodel');

const app = express();
app.use(express.json());
let editCate = '';

const categoryInfo = async (req, res) => {
    const AllCategory = await model.find();

    res.render('category', {
        usNames: req.cookies.Username,
        AllCategory: AllCategory,
        message2: '',
        editCate: ''
    });
}

const saveCategory = async (req, res) => {
    let AllCategory = await model.find();
    let len = AllCategory.length + 1;
    const catName = req.body.catName;
    const checkName = await model.findOne({ catName: catName })
    if (checkName) {
        req.flash("success", "Category Already Exists");
        res.render('category', {
            usNames: req.cookies.Username,
            AllCategory: AllCategory,
            message2: req.flash("success"),
            editCate: ''
        })
    } else {
        const result = {
            id: len,
            catName: catName
        }
        const saveData = new model(result);
        await saveData.save();
        AllCategory = await model.find(); //
        req.flash('success', 'Category Added Successfully');
        res.render('category', {
            usNames: req.cookies.Username,
            AllCategory: AllCategory,
            message2: req.flash("success"),
            editCate: ''
        })
    }
};

const deleteCategory = async (req, res) => {
    const id = req.params.id; // this id is mongodb
    const data = await model.findByIdAndDelete({ _id: id });
    AllCategory = await model.find();
    req.flash('success', 'Category Deleted Successfully');
    res.render('category', {
        usNames: req.cookies.Username,
        AllCategory: AllCategory,
        message2: req.flash("success"),
        editCate: ''
    })
};

const editCategory = async (req, res) => {
    const id = req.params.id;
    let AllCategory = await model.find();
    editCate = await model.findOne({ _id: id });
    if (editCate) {
        res.render('category', {
            usNames: req.cookies.Username,
            AllCategory: AllCategory,
            message2: '',
            editCate: editCate
        });
    }
}

const updateCategory = async (req, res) => {
    const id = req.params.id
    const catName = req.body.catName;
    const result = await model.findByIdAndUpdate({
        _id: id
    },
        {
            $set: {
                catName: catName // 1st catName is mongodb (Database) 2nd catName is variable name which is declare above.
            }
        }
    )
    AllCategory = await model.find();
    req.flash('success', 'Category Updated Successfully');
    if (result) {
        res.render('category', {
            usNames: req.cookies.Username,
            AllCategory: AllCategory,
            message2: req.flash('success'),
            editCate: ''
        });
    }
}

module.exports = { categoryInfo, saveCategory, deleteCategory, editCategory, updateCategory };